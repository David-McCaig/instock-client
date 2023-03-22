import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';

import WarehousePage from './pages/WarehousePage/WarehousePage.js';
import WarehouseDetailsPage from './pages/WarehouseDetailsPage/WarehouseDetailsPage.js';
import EditWarehousePage from './pages/EditWarehousePage/EditWarehousePage.js';
import AddWarehousePage from './pages/AddWarehousePage/AddWarehousePage.js';

import InventoryPage from './pages/InventoryPage/InventoryPage.js';
import InventoryDetailsPage from './pages/InventoryDetailsPage/InventoryDetailsPage.js';
import EditInventoryPage from './pages/EditInventoryPage/EditInventoryPage.js';
import AddInventoryPage from './pages/AddInventoryPage/AddInventoryPage.js';

function App() {
  return (
    <BrowserRouter>
      <section className="browser-container">
        <Header />
        <div className="routes-container">
          <Routes>
            <Route path='/' element={<WarehousePage/>} />
            <Route path='/warehouse/:id' element={<WarehouseDetailsPage />} />
            <Route path='/warehouse/edit/:id' element={<EditWarehousePage/>} />
            <Route path='/warehouse/add' element={<AddWarehousePage />} />
            <Route path='/inventory' element={<InventoryPage />} />
            <Route path='/inventory/:id' element={<InventoryDetailsPage />} />
            <Route path='/inventory/edit/:id' element={<EditInventoryPage />} />
            <Route path='/inventory/add' element={<AddInventoryPage/>} />
          </Routes>
        </div>
        <Footer />
      </section>
    </BrowserRouter>
  );
}

export default App;