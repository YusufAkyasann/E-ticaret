import React from 'react';
import './AddressForm.css';

function AddressForm() {
  return (
    <form className="address-form">
      <div className="form-group">
        <input type="text" placeholder="Ad Soyad" required />
      </div>
      <div className="form-group">
        <input type="text" placeholder="Telefon" required />
      </div>
      <div className="form-group">
        <input type="text" placeholder="İl" required />
      </div>
      <div className="form-group">
        <input type="text" placeholder="İlçe" required />
      </div>
      <div className="form-group">
        <textarea placeholder="Açık Adres" required></textarea>
      </div>
    </form>
  );
}

export default AddressForm; 