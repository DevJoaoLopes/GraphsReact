import React from "react";
import "./styles.css";

export default function App() {
  const [name, setName] = React.useState('');
  const [origem, setOrigem] = React.useState('');
  const [destino, setDestino] = React.useState('');
  const [caminho1, setCaminho1] = React.useState('');
  const [caminho2, setCaminho2] = React.useState('');
  const [existeCaminho, setExisteCaminho] = React.useState('');
  const [grafo, setGrafo] = React.useState([]);

  const add = () => {
    setGrafo([...grafo, {name: name, go: []}]);
    setName('');
  }

  const handleAresta = () => {
    let array = grafo.slice();
    grafo.forEach((element, i) => {
      if(element.name === origem){
        array[i].go.push(destino); 
      }
    });
    setGrafo([...array]);
  }

  const handleCaminho = () => {
    let aux = [];
    //verifica caminho direto
    grafo.forEach(element => {
      if(element.name === caminho1){
        element.go.forEach(g => {
          if(g === caminho2){
            setExisteCaminho('existe');
            // return alert("Existe caminho"); 
          }else{
            aux.push(g);
          }
        });
      }
    });
    console.log(aux);

    //nao encontrou caminho diretamente
    //verifica caminho indireto
    grafo.forEach(element => {
      if(element.name !== caminho1 && existeCaminho !== 'existe'){
        element.go.forEach(g => {
          aux.forEach(a => {
            if(g === caminho2 && element.name === a){
              console.log('existe');
              setExisteCaminho('existe');
            }else{
              aux.push(g);
              setExisteCaminho('nao existe');
            }
          });
        });
      }
    });
  }
  
  console.log(grafo);

  return (
    <div className="App">
      <h1>Grafos</h1>
      <form>
      <label>
        Nome do vertice
        <br />
        <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} />
      </label>
      </form>
      <button onClick={add}>
        Add vertice   
      </button>
      <br />
      <br />
      <br />
      <br />
      <form>
      <label>
        origem
        <br />
        <input type="text" value={origem} onChange={(ev) => setOrigem(ev.target.value)} />
      </label>
      <br />
      <label>
        destino
        <br />
        <input type="text" value={destino} onChange={(ev) => setDestino(ev.target.value)} />
      </label>
      </form>
      <button onClick={handleAresta}>
        Add aresta   
      </button>
      <br />
      <br />
      <br />
      <br />
      <form>
      <label>
        Verifica Caminho entre
        <br />
        <input type="text" value={caminho1} onChange={(ev) => setCaminho1(ev.target.value)} />
      </label>
      <br />
      <label>
        e
        <br />
        <input type="text" value={caminho2} onChange={(ev) => setCaminho2(ev.target.value)} />
      </label>
      </form>
      <button onClick={handleCaminho}>
        Verificar
      </button>
      <br />
      <label>{existeCaminho}</label>
      <br />
      <div>
      {grafo.map((e) =>
        <>
          <br />
          <label>{`${e.name} --> `}</label>
          {e.go.map((g) => 
            <label>{`${g} --> `}</label>
          )}
        </>
      )}
      </div>
    </div> 
  );
}
