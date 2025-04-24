import React, { useState } from 'react';

const ProductUpload = () => {
  const [product, setProduct] = useState({
    certificationNumber: '',
    labelType: '',
    reverseCertBarcode: false,
    year: '',
    brand: '',
    sport: '',
    cardNumber: '',
    player: '',
    varietyPedigree: '',
    grade: '',
    population: '',
    imageFront: null,
    imageBack: null
  });





//   {
//     "certificationNumber": "104928039",
//     "labelType": "with fugitive ink technology",
//     "reverseCertBarcode": true,
//     "year": 2022,
//     "brand": "POKEMON GO JAPANESE",
//     "sport": "TGC Cards",
//     "cardNumber": "010",
//     "player": "CHARIZARD-HOLO",
//     "varietyPedigree": "",
//     "grade": "MINT 9",
//     "population": 136,
//     "psaAuctionPricesRealized": null,
//     "currentPsaRegistrySets": [],
//     "imageFrontUrl": "your-image-url-front",
//     "imageBackUrl": "your-image-url-back"
//   }
  




  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can now send this data via axios to your backend
    console.log(product);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-800 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold mb-4">Upload Pokémon Card</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="certificationNumber" placeholder="Certification Number" className="w-full p-2 rounded bg-gray-700" onChange={handleChange} />
        <input type="text" name="labelType" placeholder="Label Type" className="w-full p-2 rounded bg-gray-700" onChange={handleChange} />
        <label className="flex items-center">
          <input type="checkbox" name="reverseCertBarcode" className="mr-2" onChange={handleChange} />
          Reverse Cert Barcode?
        </label>
        <input type="text" name="year" placeholder="Year" className="w-full p-2 rounded bg-gray-700" onChange={handleChange} />
        <input type="text" name="brand" placeholder="Brand" className="w-full p-2 rounded bg-gray-700" onChange={handleChange} />
        <input type="text" name="sport" placeholder="Sport" className="w-full p-2 rounded bg-gray-700" onChange={handleChange} />
        <input type="text" name="cardNumber" placeholder="Card Number" className="w-full p-2 rounded bg-gray-700" onChange={handleChange} />
        <input type="text" name="player" placeholder="Player" className="w-full p-2 rounded bg-gray-700" onChange={handleChange} />
        <input type="text" name="varietyPedigree" placeholder="Variety/Pedigree (optional)" className="w-full p-2 rounded bg-gray-700" onChange={handleChange} />
        <input type="text" name="grade" placeholder="Grade" className="w-full p-2 rounded bg-gray-700" onChange={handleChange} />
        <input type="number" name="population" placeholder="Population" className="w-full p-2 rounded bg-gray-700" onChange={handleChange} />
        <input type="text" name="psaAuctionPricesRealized" placeholder="PSA Auction Prices Realized (optional)" className="w-full p-2 rounded bg-gray-700" onChange={handleChange} />

<input type="text" name="currentPsaRegistrySets" placeholder="Current PSA Registry Sets (comma-separated, optional)" className="w-full p-2 rounded bg-gray-700" onChange={(e) => {
  const value = e.target.value.split(',').map(item => item.trim());
  setProduct(prev => ({ ...prev, currentPsaRegistrySets: value }));
}} />

        <div>
          <label>Front Image:</label>
          <input type="file" name="imageFront" className="block mt-1" onChange={handleChange} />
        </div>
        <div>
          <label>Back Image:</label>
          <input type="file" name="imageBack" className="block mt-1" onChange={handleChange} />
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 p-2 rounded w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductUpload;
