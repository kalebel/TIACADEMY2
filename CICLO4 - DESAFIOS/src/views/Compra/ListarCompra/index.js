import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarCompra = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCompras = async () => {
        await axios.get(api + "/compras/lista")
            .then((response) => {
                console.log(response.data.compras);
                setData(response.data.compras);
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
        getCompras();
    }, []);

    return (
        <Container>
            <div className="d-flex">
                <div>
                    <h1>Lista de Compras</h1>
                </div>
                <div className="m-auto p-2">
                    <Link to="/compra/cadastrar"
                        className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                </div>
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr className="text-center">
                            <th>ID Compra</th>
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
                                <td className="m-auto text-center/">
                                    <Link to={"/listar-pedido/" + item.id}
                                        className="btn btn-outline-primary btn-sm">
                                        Consultar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
        </Container>
    );
};