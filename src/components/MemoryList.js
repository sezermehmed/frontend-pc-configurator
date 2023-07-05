import React, { useEffect, useState } from 'react';
import MemoryService from '../services/MemoryService';
import RefreshIcon from '@mui/icons-material/Refresh';
import './style/MemoryList.css';

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
    const [inputValues, setInputValues] = useState({});
    const [memoryList, setMemoryList] = useState([]);

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

    const handleNewMemoryChange = (field, value) => {
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            new: {
                ...prevInputValues.new,
                [field]: value,
            },
        }));
    };

    const handleAddMemory = () => {
        setEditMode('new');
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            new: {
                name: '',
                socket: '',
                price: '',
            },
        }));
    };

    const handleSaveClickForNew = async () => {
        try {
            const newMemoryData = {
                name: inputValues.new.name,
                socket: inputValues.new.socket,
                price: inputValues.new.price,
            };
            await MemoryService.createMemory(newMemoryData);
            setEditMode(null);
            setInputValues((prevInputValues) => ({
                ...prevInputValues,
                new: {
                    name: '',
                    socket: '',
                    price: '',
                },
            }));
            refreshMemoryList();
        } catch (error) {
            console.error('Failed to create memory:', error);
        }
    };

    const handleSaveClick = async (id) => {
        try {
            const updatedMemoryData = {
                name: inputValues[id]?.name,
                socket: inputValues[id]?.socket,
                price: inputValues[id]?.price,
            };
            await MemoryService.updateMemory(id, updatedMemoryData);
            setEditMode(null);
            setInputValues((prevInputValues) => ({
                ...prevInputValues,
                [id]: {},
            }));
            refreshMemoryList();
        } catch (error) {
            console.error('Failed to update memory:', error);
        }
    };

    const handleDelete = (id) => {
        MemoryService.deleteMemory(id)
            .then(() => {
                refreshMemoryList();
            })
            .catch((error) => {
                console.error('Error deleting Memory:', error);
            });
    };

    const refreshMemoryList = () => {
        MemoryService.getAllMemory()
            .then((response) => {
                setMemoryList(response.data);
            })
            .catch((error) => {
                console.error('Error refreshing Memorys:', error);
            });
    };

    useEffect(() => {
        refreshMemoryList();
    }, []);

    return (
        <div className="memory-list-container">
            <h2 className="memory-list-title">Memory List</h2>
            <Fab color="primary" aria-label="add" onClick={handleAddMemory} className="memory-list-add-button">
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
                            <Button onClick={refreshMemoryList} variant="contained" startIcon={<RefreshIcon />} >
                                Refresh
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {editMode === 'new' && (
                        <TableRow>
                            <TableCell>{/* ID */}</TableCell>
                            <TableCell>
                                <TextField
                                    id="outlined-basic" label="Name" variant="outlined"
                                    type="text"
                                    value={inputValues.new?.name || ''}
                                    onChange={(e) => handleNewMemoryChange('name', e.target.value)}

                                />
                            </TableCell>
                            <TableCell>
                                <Select

                                    label="Ram"
                                    select
                                    variant="filled"
                                    value={inputValues.new?.socket || ''}
                                    onChange={(e) => handleNewMemoryChange('socket', e.target.value)}
                                >
                                    <MenuItem value="DDR3">DDR3</MenuItem>
                                    <MenuItem value="DDR4">DDR4</MenuItem>
                                    <MenuItem value="DDR5">DDR5</MenuItem>
                                </Select>
                            </TableCell>
                            <TableCell>
                                <TextField
                                    id="outlined-basic" label="Price" variant="outlined"
                                    type="text"
                                    value={inputValues.new?.price || ''}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*$/.test(value)) {
                                            handleNewMemoryChange('price', value);
                                        }
                                    }}

                                />
                            </TableCell>
                            <TableCell>
                                <Button onClick={handleSaveClickForNew} className="memory-list-save-button">
                                    Save
                                </Button>
                                <Button onClick={() => setEditMode(null)} className="memory-list-cancel-button">
                                    Cancel
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}

                    {memoryList.map((memory) => (
                        <TableRow key={memory.id}>
                            {editMode === memory.id ? (
                                <>
                                    <TableCell>{memory.id}</TableCell>
                                    <TableCell>
                                        <TextField
                                            type="text"
                                            value={inputValues[memory.id]?.name || ''}
                                            onChange={(e) => handleInputChange(memory.id, 'name', e.target.value)}
                                            className="memory-list-textfield"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={inputValues[memory.id]?.socket || ''}
                                            onChange={(e) => handleInputChange(memory.id, 'socket', e.target.value)}
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
                                            value={inputValues[memory.id]?.price || ''}
                                            onChange={(e) => handleInputChange(memory.id, 'price', e.target.value)}
                                            className="memory-list-textfield"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleSaveClick(memory.id)} className="memory-list-save-button">
                                            Save
                                        </Button>
                                        <Button onClick={() => setEditMode(null)} className="memory-list-cancel-button">
                                            Cancel
                                        </Button>
                                    </TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell>{memory.id}</TableCell>
                                    <TableCell>{memory.name}</TableCell>
                                    <TableCell>{memory.socket}</TableCell>
                                    <TableCell>{memory.price}</TableCell>
                                </>
                            )}
                            <TableCell>
                                <Fab
                                    color="secondary"
                                    aria-label="edit"
                                    size="small"
                                    onClick={() => handleEditClick(memory.id, memory)}
                                    className="memory-list-edit-button"
                                >
                                    <EditIcon />
                                </Fab>
                               <> </>
                                <Button
                                    variant="outlined"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleDelete(memory.id)}
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
