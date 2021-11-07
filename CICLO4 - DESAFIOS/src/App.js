import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './views/Home/';
import { Menu } from './components/Menu';

//CLIENTES
import { ListarCliente } from './views/Cliente/ListarCliente';
import { CadastrarCliente } from './views/Cliente/Cadastrar';
import { EditarCliente } from './views/Cliente/Editar';


//PEDIDOS
import { ListarPedido } from './views/Pedido/ListarPedido';
import { PedidosDoCliente } from './views/Cliente/Pedidos'
import { EditarPedido } from './views/Pedido/Editar'

//SERVIÇOS
import { ListarServico } from './views/Servico/ListarServico';
import { CadastrarServico } from './views/Servico/Cadastrar';
import { PedidosDoServico } from './views/Servico/PedidosDoServico';
import { EditarServico } from './views/Servico/Editar';


//COMPRAS
import { ListarCompra } from './views/Compra/ListarCompra';
import { ComprasDoCliente } from './views/Cliente/Compras'
import { ComprasDoProduto } from './views/Produto/ComprasDoProduto';

//PRODUTOS
import { ListarProduto } from './views/Produto/ListarProduto';
import { CadastrarProduto } from './views/Produto/Cadastrar';



function App() {
  return (
    <div>
      <Router>
        <Menu/>
        <Switch>
          <Route exact path="/" component={Home}/>
          
          <Route path='/cliente/lista' component={ListarCliente}/>
          <Route path='/pedido/lista' component={ListarPedido}/>
          <Route path='/servico/lista' component={ListarServico}/>
          <Route path='/compra/lista' component={ListarCompra}/>
          <Route path='/produto/lista' component={ListarProduto}/>

          <Route path='/cliente/cadastrar' component={CadastrarCliente}/>
          <Route path='/servico/cadastrar' component={CadastrarServico}/>
          <Route path='/produto/cadastrar' component={CadastrarProduto}/>
          
          <Route path='/servico/pedidos/:id' component={PedidosDoServico}/>
          <Route path='/produto/compras/:id' component={ComprasDoProduto}/>
          
          <Route path='/pedidos/cliente/:id' component={PedidosDoCliente}/>
          <Route path='/compras/cliente/:id' component={ComprasDoCliente}/>

          <Route patch='/cliente/editar/:id' component={EditarCliente}/>
          <Route patch='/servico/editar/:id' component={EditarServico}/>
          <Route patch='/pedido/editar/:id' component={EditarPedido}/>

          
        </Switch>
      </Router>

    </div>
  );
}

export default App;