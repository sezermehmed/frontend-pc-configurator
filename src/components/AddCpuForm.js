import React, { useState } from 'react';

const AddCpuForm = ({ addCpu }) => {
  const initialState = {
    id: null,
    componenttype: '',
    partnumber: '',
    name: '',
    supportedmemory: '',
    socket: '',
    price: ''
  };

  const [cpu, setCpu] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCpu({ ...cpu, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCpu(cpu);
    setCpu(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="componenttype"
        value={cpu.componenttype}
        onChange={handleChange}
        placeholder="Component Type"
        required
      />
      {/* Add other input fields for partnumber, name, supportedmemory, socket, and price */}
      <button type="submit">Add CPU</button>
    </form>
  );
};

export default AddCpuForm;
