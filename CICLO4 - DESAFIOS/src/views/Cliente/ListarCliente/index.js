import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarCliente = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getClientes = async () => {
        await axios.get(api + "/clientes/lista")
            .then((response) => {
                console.log(response.data.clientes);
                setData(response.data.clientes);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                //console.log("Erro: sem conexão com a API")
            })
    };

    const apagarCliente = async(idCliente)=>{
        console.log(idCliente);

        const headers={
            'Content-Type': 'application/json'
        }
        await axios.get(api+"/clientes/"+idCliente+"/excluir",{headers})
        .then((response)=>{
            console.log(response.data.error);
            getClientes();
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Não foi possível conectar-se a API'
            });
        });
    }



    useEffect(() => {
        getClientes();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Lista de Clientes</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cliente/cadastrar"
                            className="btn btn-outline-primary btn-sm">Cadastrar Cliente</Link>
                    </div>
                    {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>Nascimento</th>
                            <th>Cliente Desde</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {data.map(clientes => (
                            <tr key={clientes.id}>
                                <th>{clientes.id}</th>
                                <td>{clientes.nome}</td>
                                <td>{clientes.endereco}</td>
                                <td>{clientes.cidade}</td>
                                <td>{clientes.uf}</td>
                                <td>{clientes.nascimento}</td>
                                <td>{clientes.clienteDesde}</td>
                                <td className="d-flex text-center">
                                    <Link to={"/pedidos/cliente/" + clientes.id}
                                        className="m-auto btn btn-outline-success btn-sm">
                                        Pedidos do Cliente
                                    </Link>
                                    <Link to={"/compras/cliente/" + clientes.id}
                                        className="m-auto btn btn-outline-primary btn-sm">
                                        Compras do Cliente
                                    </Link>
                                    <Link to={"/cliente/editar/" + clientes.id}
                                        className="m-auto btn btn-outline-warning btn-sm">
                                        Editar Cliente
                                    </Link>
                                    <span className="m-auto btn btn-outline-danger btn-sm"
                                        onClick={()=>apagarCliente(clientes.id)}>Excluir Cliente</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};