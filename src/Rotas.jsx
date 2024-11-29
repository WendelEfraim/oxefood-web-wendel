import React from 'react';
import { Route, Routes } from "react-router-dom";

import FormCliente from './views/client/FormCliente';
import FormEntregador from './views/entregador/FormEntregador';
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';
import ListCliente from './views/client/ListCliente';
import ListEntregador from './views/entregador/ListEntregador';
import ListVenda from './views/venda/ListVenda';
import FormVenda from './views/venda/FormVenda';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="form-cliente" element={ <FormCliente/> } />
                <Route path="form-produto" element={ <FormProduto/> } />
                <Route path="form-entregador" element={ <FormEntregador/> } />
                <Route path="list-cliente" element={ <ListCliente/> } />
                <Route path="list-entregador" element={ <ListEntregador/> } />
                <Route path="list-venda" element={ <ListVenda/> } />
                <Route path="form-venda" element={ <FormVenda/> } />
            </Routes>
        </>
    )
}

export default Rotas
