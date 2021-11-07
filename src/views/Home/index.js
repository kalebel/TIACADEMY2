import { Container } from "reactstrap";

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Home</h1>
                    </div>
                    <div className="p-2">
                        <a href="/cliente/lista" className="btn btn-secondary btn-sm">Clientes</a>
                    </div>
                    <div className="p-2"> 
                        <a href="/pedido/lista" className="btn btn-outline-success btn-sm">Pedidos</a>
                    </div>
                    <div className="p-2">
                        <a href="/servico/lista" className="btn btn-outline-success btn-sm">Serviços</a>
                    </div>
                    <div className="p-2">
                        <a href="/compra/lista" className="btn btn-outline-primary btn-sm">Compras</a>
                    </div>
                    <div className="p-2">
                        <a href="/produto/lista" className="btn btn-outline-primary btn-sm">Produtos</a>
                    </div>
                </div>
            </Container>
        </div>
    );
};