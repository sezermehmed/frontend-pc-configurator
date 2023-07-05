import React, {useEffect, useState} from 'react';
import MemoryService from '../services/MemoryService';
import RefreshIcon from '@mui/icons-material/Refresh';
import "./style/MemoryList.css";

import {
    Fab,
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    Select,
    MenuItem,
} from '@mui/material';

import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';



const MemoryList = () => {
    const [editMode, setEditMode] = useState(false);
    const [Memorys, setMemorys] = useState([]);
    const [inputValues, setInputValues] = useState({});
    const handleInputChange = (id, field, value) => {
        setInputValues((prevState) => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                [field]: value,
            },
        }));
    };
    const handleEditClick = (id, data) => {
        setInputValues((prevState) => ({
            ...prevState,
            [id]: data,
        }));
        setEditMode(id);
    };



    const handleSaveClick = async (id) => {
        try {
            const updatedMemory = {
                name: inputValues[id]?.name,
                price: inputValues[id]?.price,
                socket: inputValues[id]?.socket,
            };
            await MemoryService.updateMemory(id, updatedMemory);
            setEditMode(null); // Reset edit mode
            setInputValues((prevState) => ({
                ...prevState,
                [id]: {}, // Clear the input values for the updated memory
            }));
            refreshMemorys(); // Refresh the memory list
        } catch (error) {
            console.error("Failed to update memory:", error);
        }
    };
    useEffect(() => {
        refreshMemorys();
    }, []);

    const refreshMemorys = () => {
        MemoryService.getAllMemory()
            .then((response) => {
                setMemorys(response.data);
            })
            .catch((error) => {
                console.error('Error refreshing Memorys:', error);
            });
    };

    const refreshMemoryById = () => {
        MemoryService.getAllMemory()
            .then((response) => {
                setMemorys(response.data);
            })
            .catch((error) => {
                console.error('Error refreshing Memories:', error);
            });
    };

    const handleRefreshMemoryById = (id) => {
        MemoryService.getMemoryById(id)
            .then((value) => {
                refreshMemorys();
            })
            .catch((error) => {
                console.error('Error refreshing Memory: ', error);
            });
    };

    const handleDelete = (id) => {
        MemoryService.deleteMemory(id)
            .then(() => {
                refreshMemorys();
            })
            .catch((error) => {
                console.error('Error deleting Memory:', error);
            });
    };

    const createMemorys = (memory) => {
        MemoryService.createMemory()
            .then((response) => {
                setMemorys(response.data);
            })
            .catch((error) => {
                console.error('Error creating Memory:', error);
            });
    };

    const handleEdit = (id) => {

        setEditMode(id);


    };

    return  (
        <div className="memory-list-container">
            <h2 className="memory-list-title">Memory List</h2>
            <Fab color="primary" aria-label="add" onClick={createMemorys} className="memory-list-add-button">
                <AddIcon />
            </Fab>
            <Table>

                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Socket</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Actions</TableCell>
                        <TableCell>
                        <Button onClick={refreshMemorys} variant="contained" startIcon={<RefreshIcon />} >
                            Refresh
                        </Button>
                        </TableCell>
                    </TableRow>

                </TableHead>
                <TableBody>
                    {Memorys.map((Memory) => (
                        <TableRow key={Memory.id}>
                            {editMode === Memory.id ? (
                                <>
                                    <TableCell>{Memory.id}</TableCell>
                                    <TableCell>
                                        <TextField
                                            type="text"
                                            value={inputValues[Memory.id]?.name || ''}
                                            onChange={(e) => handleInputChange(Memory.id, 'name', e.target.value)}
                                            className="memory-list-textfield"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={inputValues[Memory.id]?.socket || ''}
                                            onChange={(e) => handleInputChange(Memory.id, 'socket', e.target.value)}
                                            className="memory-list-select"
                                        >
                                            <MenuItem value="DDR3">DDR3</MenuItem>
                                            <MenuItem value="DDR4">DDR4</MenuItem>
                                            <MenuItem value="DDR5">DDR5</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            type="text"
                                            value={inputValues[Memory.id]?.price || ''}
                                            onChange={(e) => handleInputChange(Memory.id, 'price', e.target.value)}
                                            className="memory-list-textfield"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleSaveClick(Memory.id)} className="memory-list-save-button">
                                            Save
                                        </Button>
                                        <Button onClick={() => setEditMode(null)} className="memory-list-cancel-button">
                                            Cancel
                                        </Button>
                                    </TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell>{Memory.id}</TableCell>
                                    <TableCell>{Memory.name}</TableCell>
                                    <TableCell>{Memory.socket}</TableCell>
                                    <TableCell>{Memory.price}</TableCell>
                                </>
                            )}
                            <TableCell>
                                <Fab
                                    color="secondary"
                                    aria-label="edit"
                                    size="small"
                                    onClick={() => handleEditClick(Memory.id, Memory)}
                                    className="memory-list-edit-button"
                                >
                                    <EditIcon />
                                </Fab>
                                <Button
                                    variant="outlined"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleDelete(Memory.id)}
                                    className="memory-list-delete-button"
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default MemoryList;
