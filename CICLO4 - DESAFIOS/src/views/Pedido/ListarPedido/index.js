import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarPedido = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPedidos = async () => {
        await axios.get(api + "/pedidos/lista")
            .then((response) => {
                console.log(response.data.pedidos);
                setData(response.data.pedidos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                //console.log("Erro: sem conexão com a API")
            })
    }

    useEffect(() => {
        getPedidos();
    }, []);

    return (
        <Container>
            <div className="d-flex">
                <div>
                    <h1>Lista de Pedidos</h1>
                </div>
                <div className="m-auto p-2">
                    <Link to="/pedido/cadastrar"
                        className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                </div>
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr className="text-center">
                            <th>ID Pedido</th>
                            <th>ID Cliente</th>
                            <th>Data</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {data.map(item => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <th>{item.ClienteId}</th>
                                <td>{item.data}</td>
                                <td className="d-flex text-center">
                                    <Link to={"/listar-pedido/" + item.id}
                                        className="m-auto btn btn-outline-primary btn-sm">
                                        Consultar
                                    </Link>
                                    <Link to={"/pedido/editar/" + item.id}
                                        className="m-auto btn btn-outline-warning btn-sm">
                                        Editar Pedido
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
        </Container>
    );
};