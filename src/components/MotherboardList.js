import React, {useEffect, useState} from 'react';
import MotherboardService from '../services/MotherboardService';
import RefreshIcon from '@mui/icons-material/Refresh';
import './style/MotherboardList.css';

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
import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';


import {Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon} from '@mui/icons-material';

const MotherboardList = () => {
    const [editMode, setEditMode] = useState(false);
    const [inputValues, setInputValues] = useState({});
    const [motherboardList, setMotherboardList] = useState([]);

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

    const handleNewMotherboardChange = (field, value) => {
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            new: {
                ...prevInputValues.new,
                [field]: value,
            },
        }));
    };

    const handleAddMotherboard = () => {
        setEditMode('new');
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            new: {
                name: '',
                supported_memory: '',
                price: '',
            },
        }));
    };

    const handleSaveClickForNew = async () => {
        try {
            const newMotherboardData = {
                name: inputValues.new.name,
                supported_memory: inputValues.new.supported_memory,
                price: inputValues.new.price,
            };
            await MotherboardService.createMotherboard(newMotherboardData);
            setEditMode(null);
            setInputValues((prevInputValues) => ({
                ...prevInputValues,
                new: {
                    name: '',
                    supported_memory: '',
                    price: '',
                },
            }));
            refreshMotherboardList();
        } catch (error) {
            console.error('Failed to create motherboard:', error);
        }
    };

    const handleSaveClick = async (id) => {
        try {
            const updatedMotherboardData = {
                name: inputValues[id]?.name,
                supported_memory: inputValues[id]?.supported_memory,
                price: inputValues[id]?.price,
            };
            await MotherboardService.updateMotherboard(id, updatedMotherboardData);
            setEditMode(null);
            setInputValues((prevInputValues) => ({
                ...prevInputValues,
                [id]: {},
            }));
            refreshMotherboardList();
        } catch (error) {
            console.error('Failed to update Motherboard:', error);
        }
    };

    const handleDelete = (id) => {
        MotherboardService.deleteMotherboard(id)
            .then(() => {
                refreshMotherboardList();
            })
            .catch((error) => {
                console.error('Error deleting Motherboard:', error);
            });
    };

    const refreshMotherboardList = () => {
        MotherboardService.getAllMotherboard()
            .then((response) => {
                setMotherboardList(response.data);
            })
            .catch((error) => {
                console.error('Error refreshing Motherboards:', error);
            });
    };

    useEffect(() => {
        refreshMotherboardList();
    }, []);

    return (
        <div className="motherboard-list-container">
            <h2 className="motherboard-list-title">Motherboard List</h2>
            <Fab color="primary" aria-label="add" onClick={handleAddMotherboard}
                 className="motherboard-list-add-button">
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
                            <Button onClick={refreshMotherboardList} variant="contained" startIcon={<RefreshIcon/>}>
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
                                    onChange={(e) => handleNewMotherboardChange('name', e.target.value)}

                                />
                            </TableCell>
                            <TableCell>
                                <FormControl sx={{m: 1, minWidth: 80}}>
                                    <InputLabel id="demo-simple-select-helper-label">Socket</InputLabel>
                                    <Select
                                        value={inputValues.new?.supported_memory || ''}
                                        onChange={(e) => handleNewMotherboardChange('supported_memory', e.target.value)}
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
                                            handleNewMotherboardChange('price', value);
                                        }
                                    }}

                                />
                            </TableCell>
                            <TableCell>
                                <Button onClick={handleSaveClickForNew} variant="contained">
                                    Save
                                </Button>
                                <> </>
                                <Button onClick={() => setEditMode(null)} variant="contained">
                                    Cancel
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
{/*AFTER CLICKED THE EDIT BUTTON*/}
                    {motherboardList.map((motherboard) => (
                        <TableRow key={motherboard.id}>
                            {editMode === motherboard.id ? (
                                <>
                                    <TableCell>{motherboard.id}</TableCell>
                                    <TableCell>
                                        <TextField
                                            type="text"
                                            value={inputValues[motherboard.id]?.name || ''}
                                            onChange={(e) => handleInputChange(motherboard.id, 'name', e.target.value)}
                                            // className="motherboard-list-textfield"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={inputValues[motherboard.id]?.supported_memory || ''}
                                            onChange={(e) => handleInputChange(motherboard.id ,'supported_memory', e.target.value)}
                                            className="motherboard-list-select"
                                        >
                                            <MenuItem value="DDR3">DDR3</MenuItem>
                                            <MenuItem value="DDR4">DDR4</MenuItem>
                                            <MenuItem value="DDR5">DDR5</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            type="text"
                                            value={inputValues[motherboard.id]?.price || ''}
                                            onChange={(e) => handleInputChange(motherboard.id, 'price', e.target.value)}
                                            // className="motherboard-list-textfield"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleSaveClick(motherboard.id)}
                                                className="motherboard-list-save-button"
                                                variant="contained"
                                        >
                                            Save
                                        </Button>
                                        <> </>
                                        <Button onClick={() => setEditMode(null)}
                                                className="motherboard-list-cancel-button" variant="contained">
                                            Cancel
                                        </Button>
                                    </TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell>{motherboard.id}</TableCell>
                                    <TableCell>{motherboard.name}</TableCell>
                                    <TableCell>{motherboard.supported_memory}</TableCell>
                                    <TableCell>{motherboard.price}</TableCell>
                                </>
                            )}
                            <TableCell>
                                <Fab
                                    color="secondary"
                                    aria-label="edit"
                                    size="small"
                                    onClick={() => handleEditClick(motherboard.id, motherboard)}
                                    className="motherboard-list-edit-button"
                                >
                                    <EditIcon/>
                                </Fab>
                                <> </>
                                <Button
                                    variant="outlined"
                                    startIcon={<DeleteIcon/>}
                                    onClick={() => handleDelete(motherboard.id)}
                                    className="motherboard-list-delete-button"
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

export default MotherboardList;
