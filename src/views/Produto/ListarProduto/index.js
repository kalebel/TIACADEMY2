import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarProduto = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getProdutos = async () => {
        await axios.get(api + "/produtos/lista")
            .then((response) => {
                console.log(response.data.produtos);
                setData(response.data.produtos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                //console.log("Erro: sem conexão com a API")
            })
    }

    const apagarProduto = async(idProduto)=>{
        console.log(idProduto);

        const headers={
            'Content-Type': 'application/json'
        }
        await axios.get(api+"/produtos/"+idProduto+"/excluir",{headers})
        .then((response)=>{
            console.log(response.data.error);
            getProdutos();
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Não foi possível conectar-se a API'
            });
        });
    }

    useEffect(() => {
        getProdutos();
    }, []);

    return (
        <Container>
            <div className="d-flex">
                <div>
                    <h1>Lista de Produtos</h1>
                </div>
                <div className="m-auto p-2">
                    <Link to="/produto/cadastrar"
                        className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                </div>
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr className="text-center">
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
                                    <Link to={"/produto/compras/" + item.id}
                                        className="m-auto btn btn-outline-primary btn-sm">
                                        Compras com esse Produto
                                    </Link>
                                    <span className="m-auto btn btn-outline-danger btn-sm"
                                        onClick={()=>apagarProduto(item.id)}>Excluir Produto</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
        </Container>
    );
};