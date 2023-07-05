import React, {useEffect, useState} from 'react';
import CpuService from '../services/CpuService';
import RefreshIcon from '@mui/icons-material/Refresh';
import './style/CpuList.css';

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

const CpuList = () => {
    const [editMode, setEditMode] = useState(false);
    const [inputValues, setInputValues] = useState({});
    const [cpuList, setCpuList] = useState([]);

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

    const handleNewCpuChange = (field, value) => {
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            new: {
                ...prevInputValues.new,
                [field]: value,
            },
        }));
    };

    const handleAddCpu = () => {
        setEditMode('new');
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            new: {
                name: '',
                supportedMemory: '',
                price: '',
            },
        }));
    };

    const handleSaveClickForNew = async () => {
        try {
            const newCpuData = {
                name: inputValues.new.name,
                supportedMemory: inputValues.new.supportedMemory,
                price: inputValues.new.price,
            };
            await CpuService.createCpu(newCpuData);
            setEditMode(null);
            setInputValues((prevInputValues) => ({
                ...prevInputValues,
                new: {
                    name: '',
                    supportedMemory: '',
                    price: '',
                },
            }));
            refreshCpuList();
        } catch (error) {
            console.error('Failed to create cpu:', error);
        }
    };


    const handleSaveClick = async (id) => {
        try {
            const updatedCpuData = {
                name: inputValues[id]?.name,
                supportedMemory: inputValues[id]?.supportedMemory,
                price: inputValues[id]?.price,
            };
            await CpuService.updateCpu(id, updatedCpuData);
            setEditMode(null);
            setInputValues((prevInputValues) => ({
                ...prevInputValues,
                [id]: {},
            }));
            refreshCpuList();
        } catch (error) {
            console.error('Failed to update Cpus:', error);
        }
    };

    const handleDelete = (id) => {
        CpuService.deleteCpu(id)
            .then(() => {
                refreshCpuList();
            })
            .catch((error) => {
                console.error('Error deleting Cpu:', error);
            });
    };

    const refreshCpuList = () => {
        CpuService.getAllCpu()
            .then((response) => {
                setCpuList(response.data);
            })
            .catch((error) => {
                console.error('Error refreshing Cpus:', error);
            });
    };

    useEffect(() => {
        refreshCpuList();
    }, []);

    return (
        <div className="cpu-list-container">
            <h2 className="cpu-list-title">Cpu List</h2>
            <Fab color="primary" aria-label="add" onClick={handleAddCpu} className="cpu-list-add-button">
                <AddIcon/>
            </Fab>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Supported Memory</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Actions</TableCell>
                        <TableCell>
                            <Button onClick={refreshCpuList} variant="contained" startIcon={<RefreshIcon/>}>
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
                                    onChange={(e) => handleNewCpuChange('name', e.target.value)}

                                />
                            </TableCell>
                            <TableCell>
                                <FormControl sx={{m: 1, minWidth: 80}}>
                                    <InputLabel id="demo-simple-select-helper-label">Socket</InputLabel>
                                    <Select
                                        value={inputValues.new?.supportedMemory || ''}
                                        onChange={(e) => handleNewCpuChange('supportedMemory', e.target.value)}
                                        className="cpu-list-select"

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
                                            handleNewCpuChange('price', value);
                                        }
                                    }}

                                />
                            </TableCell>
                            <TableCell>
                                <Button onClick={handleSaveClickForNew}
                                    // className="cpu-list-save-button"
                                        variant="contained"
                                >
                                    Save
                                </Button>
                                <> </>
                                <Button onClick={() => setEditMode(null)}
                                    // className="cpu-list-cancel-button"
                                        variant="contained"

                                >
                                    Cancel
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                    {/*AFTER CLICKED EDIT BUTTON*/}
                    {cpuList.map((cpu) => (
                        <TableRow key={cpu.id}>
                            {editMode === cpu.id ? (
                                <>
                                    <TableCell>{cpu.id}</TableCell>
                                    <TableCell>
                                        <TextField
                                            type="text"
                                            value={inputValues[cpu.id]?.name || ''}
                                            onChange={(e) => handleInputChange(cpu.id, 'name', e.target.value)}
                                            className="cpu-list-textfield"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={inputValues[cpu.id]?.supportedMemory || ''}
                                            onChange={(e) => handleInputChange(cpu.id, 'supportedMemory', e.target.value)}
                                            className="cpu-list-select"
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
                                            // className="cpu-list-textfield"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleSaveClick(cpu.id)}
                                            // className="cpu-list-save-button"
                                                variant="contained"
                                        >
                                            Save
                                        </Button>
                                        <> </>
                                        <Button onClick={() => setEditMode(null)}
                                            // className="cpu-list-cancel-button"
                                                variant="contained"
                                        >
                                            Cancel
                                        </Button>
                                    </TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell>{cpu.id}</TableCell>
                                    <TableCell>{cpu.name}</TableCell>
                                    <TableCell>{cpu.supportedMemory}</TableCell>
                                    <TableCell>{cpu.price}</TableCell>
                                </>
                            )}
                            <TableCell>
                                <Fab
                                    color="secondary"
                                    aria-label="edit"
                                    size="small"
                                    onClick={() => handleEditClick(cpu.id, cpu)}
                                    className="cpu-list-edit-button"
                                >
                                    <EditIcon/>
                                </Fab>
                                <> </>
                                <Button
                                    variant="outlined"
                                    startIcon={<DeleteIcon/>}
                                    onClick={() => handleDelete(cpu.id)}
                                    className="cpu-list-delete-button"
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

export default CpuList;
