import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const PedidosDoCliente = (props) => {

    //console.log(props.match.params.id);

    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPed = async () => {
        await axios.get(api + "/cliente/"+id+"/pedidos")
        .then((response) => {
            console.log(response.data.ped);
            setData(response.data.ped);
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
        getPed();
    }, [id]);

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Pedidos do Cliente: {id}</h1>
                </div>
                <div className="p-2">
                    <Link to="/cliente/lista" className="btn btn-outline-success btn-sm">Clientes</Link>
                </div>
                <div className="p-2">
                    <Link to="/pedido/lista" className="btn btn-outline-success btn-sm">Pedidos</Link>
                </div>
            </div>
            {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
            <Table striped>
                <thead>
                    <tr>
                        <th>ID do Pedido</th>
                        <th>Data do Pedido</th>
                        <th>Pedido Criado em</th>
                        <th>Pedido Atualizado em</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(ped => (
                        <tr key={ped.ClienteId}>
                            <th>{ped.id}</th>
                            <td>{ped.data}</td>
                            <td>{ped.createdAt}</td>
                            <td>{ped.updatedAt}</td>
                            <td className="text-center/">
                                <Link to={"/listar-pedido/"}
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