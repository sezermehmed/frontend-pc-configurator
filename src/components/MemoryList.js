import React, {useEffect, useState} from 'react';
import MemoryService from '../services/MemoryService';
import RefreshIcon from '@mui/icons-material/Refresh';
import './style/MemoryList.css';

import {
    Button,
    Fab,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';

import {Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon} from '@mui/icons-material';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

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
            console.error('Failed to create cpu:', error);
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
            console.error('Failed to update cpu:', error);
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
                console.error('Error refreshing Memories:', error);
            });
    };

    useEffect(() => {
        refreshMemoryList();
    }, []);

    return (
        <div className="memory-list-container">
            <h2 className="memory-list-title">Memory List</h2>
            <Fab color="primary" aria-label="add" onClick={handleAddMemory} className="memory-list-add-button">
                <AddIcon/>
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
                            <Button onClick={refreshMemoryList} variant="contained" startIcon={<RefreshIcon/>}>
                                Refresh
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>


                    {/*AFTER CLICKED ADD BUTTON*/}
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
                                <FormControl sx={{m: 1, minWidth: 80}}>
                                    <InputLabel id="demo-simple-select-helper-label">Socket</InputLabel>
                                    <Select
                                        value={inputValues.new?.socket || ''}
                                        onChange={(e) => handleNewMemoryChange('socket', e.target.value)}
                                        className="memory-list-select"


                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        label="Slot"
                                    >
                                        <MenuItem value="DDR3">DDR3</MenuItem>
                                        <MenuItem value="DDR4">DDR4</MenuItem>
                                        <MenuItem value="DDR5">DDR5</MenuItem>
                                    </Select>
                                </FormControl>
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
                                <Button onClick={handleSaveClickForNew}
                                    // className="memory-list-save-button"
                                        variant="contained"
                                >
                                    Save
                                </Button>
                                <> </>
                                <Button onClick={() => setEditMode(null)}
                                    // className="memory-list-cancel-button"
                                        variant="contained"
                                >
                                    Cancel
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                    {/*AFTER CLICKED THE EDIT BUTTON*/}
                    {memoryList.map((cpu) => (
                        <TableRow key={cpu.id}>
                            {editMode === cpu.id ? (
                                <>
                                    <TableCell>{cpu.id}</TableCell>
                                    <TableCell>
                                        <TextField
                                            type="text"
                                            value={inputValues[cpu.id]?.name || ''}
                                            onChange={(e) => handleInputChange(cpu.id, 'name', e.target.value)}
                                            // className="memory-list-textfield"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={inputValues[cpu.id]?.socket || ''}
                                            onChange={(e) => handleInputChange(cpu.id, 'socket', e.target.value)}
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
                                            value={inputValues[cpu.id]?.price || ''}
                                            onChange={(e) => handleInputChange(cpu.id, 'price', e.target.value)}
                                            // className="memory-list-textfield"

                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleSaveClick(cpu.id)}
                                            // className="memory-list-save-button"
                                                variant="contained">
                                            Save
                                        </Button>
                                        <> </>
                                        <Button onClick={() => setEditMode(null)}
                                            // className="memory-list-cancel-button"
                                                variant="contained">
                                            Cancel
                                        </Button>
                                    </TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell>{cpu.id}</TableCell>
                                    <TableCell>{cpu.name}</TableCell>
                                    <TableCell>{cpu.socket}</TableCell>
                                    <TableCell>{cpu.price}</TableCell>
                                </>
                            )}
                            <TableCell>
                                <Fab
                                    color="secondary"
                                    aria-label="edit"
                                    size="small"
                                    onClick={() => handleEditClick(cpu.id, cpu)}
                                    className="memory-list-edit-button"
                                >
                                    <EditIcon/>
                                </Fab>
                                <> </>
                                <Button
                                    variant="outlined"
                                    startIcon={<DeleteIcon/>}
                                    onClick={() => handleDelete(cpu.id)}
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
