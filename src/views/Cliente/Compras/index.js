import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ComprasDoCliente = (props) => {

    //console.log(props.match.params.id);

    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCompras = async () => {
        await axios.get(api + "/cliente/"+id+"/compras")
        .then((response) => {
            console.log(response.data.compra);
            setData(response.data.compra);
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
    }, [id]);

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Compras do Cliente: {id}</h1>
                </div>
                <div className="p-2">
                    <Link to="/cliente/lista" className="btn btn-outline-success btn-sm">Clientes</Link>
                </div>
                <div className="p-2">
                    <Link to="/compra/lista" className="btn btn-outline-success btn-sm">Compras</Link>
                </div>
            </div>
            {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
            <Table striped>
                <thead>
                    <tr>
                        <th>ID da Compra</th>
                        <th>Data da Compra</th>
                        <th>Compra Criada em</th>
                        <th>Compra Atualizada em</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(compra => (
                        <tr key={compra.ClienteId}>
                            <th>{compra.id}</th>
                            <td>{compra.data}</td>
                            <td>{compra.createdAt}</td>
                            <td>{compra.updatedAt}</td>
                            <td className="text-center/">
                                <Link to={"/listar-compra/"}
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