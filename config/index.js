module.exports = {
    secret: process.env.NODE_ENV === "production" ? process.env.SECRET: "D5FG45DF4G5DFG4D5FGGD5FG45DF4G5DF4G5DF4G5DF4G5D4FG54DF5G4DF5G4D5F4G",
    api: process.env.NODE_ENV === "production" ? "https://api.loja-teste.amplirr.com" : "http://localhost:3000",
    loja: process.env.NODE_ENV === "production" ? "https://loja-teste.amplirr.com" : "http://localhost:8000"
}