import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import data from '../Location_data.json'

const Insert_student = () => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [Email, setEmail] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const student = { Names: name, Grade: grade, Gender: gender, Age: age, Email: Email, Province: selectedProvince, 
      District: selectedDistrict, Sector: selectedSector, Cell: selectedCell, Village: selectedVillage };
    try {
      await axios.post('http://localhost:5000/api/students', student);
      navigate('/home/students');
    } catch (error) {
      console.error('There was an error inserting the student!', error);
      alert('Failed to insert student. Please check the console for more details.');
    }
  };

// Location data
const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedCell, setSelectedCell] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');

  const provinces = Object.keys(data);
  const districts = selectedProvince ? Object.keys(data[selectedProvince]) : [];
  const sectors = selectedDistrict ? Object.keys(data[selectedProvince][selectedDistrict]) : [];
  const cells = selectedSector ? Object.keys(data[selectedProvince][selectedDistrict][selectedSector]) : [];
  const villages = selectedCell ? data[selectedProvince][selectedDistrict][selectedSector][selectedCell] : [];

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict('');
    setSelectedSector('');
    setSelectedCell('');
    setSelectedVillage('');
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedSector('');
    setSelectedCell('');
    setSelectedVillage('');
  };

  const handleSectorChange = (e) => {
    setSelectedSector(e.target.value);
    setSelectedCell('');
    setSelectedVillage('');
  };

  const handleCellChange = (e) => {
    setSelectedCell(e.target.value);
    setSelectedVillage('');
  };

  const handleVillageChange = (e) => {
    setSelectedVillage(e.target.value);
  };

  return (
    <div className="container mt-5">
  <h1 className="mb-4 text-center">Add New Student</h1>
  <div className="row justify-content-center">
    <div className="col-md-8">
      <form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow">
        <div className="mb-3">
          <label htmlFor="name" className="form-label text-white">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="grade" className="form-label text-white">Grade</label>
          <select
            id="grade"
            className="form-control"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          >
            <option value="">Select Grade</option>
            {[...Array(6)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label text-white">Gender</label>
          <select
            id="gender"
            className="form-control"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label text-white">Age</label>
          <input
            type="number"
            id="age"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Email" className="form-label text-white">Email</label>
          <input
            type="text"
            id="Email"
            className="form-control"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label text-white">Address</label>
          <div className="row">
            <div className="col">
              <select className="form-control" value={selectedProvince} onChange={handleProvinceChange}>
                <option value="">Select Province</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <select className="form-control" value={selectedDistrict} onChange={handleDistrictChange}>
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <select className="form-control" value={selectedSector} onChange={handleSectorChange}>
                <option value="">Select Sector</option>
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <select className="form-control" value={selectedCell} onChange={handleCellChange}>
                <option value="">Select Cell</option>
                {cells.map((cell) => (
                  <option key={cell} value={cell}>
                    {cell}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <select className="form-control" value={selectedVillage} onChange={handleVillageChange}>
                <option value="">Select Village</option>
                {villages.map((village, index) => (
                  <option key={index} value={village}>
                    {village}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default Insert_student;
