import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarServico = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getServicos = async () => {
        await axios.get(api + "/servicos/lista")
            .then((response) => {
                console.log(response.data.servicos);
                setData(response.data.servicos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                //console.log("Erro: sem conexão com a API")
            })
    }

    const apagarServico = async(idServico)=>{
        console.log(idServico);

        const headers={
            'Content-Type': 'application/json'
        }
        await axios.get(api+"/servicos/"+idServico+"/excluir",{headers})
        .then((response)=>{
            console.log(response.data.error);
            getServicos();
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Não foi possível conectar-se a API'
            });
        });
    }



    useEffect(() => {
        getServicos();
    }, []);

    return (
        <Container>
            <div className="d-flex">
                <div>
                    <h1>Lista de Serviços</h1>
                </div>
                <div className="m-auto p-2">
                    <Link to="/servico/cadastrar"
                        className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                </div>
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                </div>
                <Table striped>
                    <thead className="text-center">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {data.map(item => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td className="d-flex text-center/">
                                    <Link to={"/servico/pedidos/" + item.id}
                                        className="m-auto btn btn-outline-primary btn-sm">
                                        Pedidos com esse Serviço
                                    </Link>
                                    <Link to={"/servico/editar/" + item.id}
                                        className="m-auto btn btn-outline-primary btn-sm">
                                        Editar Serviço
                                    </Link>
                                    <span className="m-auto btn btn-outline-danger btn-sm"
                                        onClick={()=>apagarServico(item.id)}>Excluir Serviço</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
        </Container>
    );
};