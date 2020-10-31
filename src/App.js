import React from "react";
import "./styles.css";

export default function App() {
  const [name, setName] = React.useState('');
  const [origem, setOrigem] = React.useState('');
  const [destino, setDestino] = React.useState('');
  const [caminho1, setCaminho1] = React.useState('');
  const [caminho2, setCaminho2] = React.useState('');
  const [existeCaminho, setExisteCaminho] = React.useState('');
  const [ciclo, setCiclo] = React.useState('');
  const [existeCiclo, setExisteCiclo] = React.useState('');
  const [grafo, setGrafo] = React.useState([]);
  const [euleriano, setEuleriano] = React.useState('');
  const [largura, setLargura] = React.useState('');
  const [arrayLarg, setArrayLarg] = React.useState([]);
  const [profundidade, setProfundidade] = React.useState('');

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
    let existe = false;
    //verifica caminho direto
    grafo.forEach(element => {
      if(element.name === caminho1){
        element.go.forEach(g => {
          if(g === caminho2){
            setExisteCaminho('existe');
            existe = true;
          }else{
            aux.push(g);
          }
        });
      }
    });

    //nao encontrou caminho diretamente
    //verifica caminho indireto
    grafo.forEach(element => {
      if(element.name !== caminho1 && existe === false){
        if(element.go.length > 0){
          element.go.forEach(g => {
            aux.forEach(a => {
              if(g === caminho2 && element.name === a){
                existe = true;
                setExisteCaminho('existe');
              }else if(existe === false){
                aux.push(g);
                setExisteCaminho('nao existe');
              }
            });
          });
        }else setExisteCaminho('nao existe');
      }
    });
  }

  const handleCiclo = () => {
    let aux = [];
    let existe = false;
    //verifica caminho direto
    grafo.forEach(element => {
      if(element.name === ciclo){
        element.go.forEach(g => {
          if(g === ciclo){
            setExisteCiclo('existe');
            existe = true;
          }else{
            aux.push(g);
          }
        });
      }
    });
    
    //nao encontrou caminho diretamente
    //verifica caminho indireto
    grafo.forEach(element => {
      if(element.name !== ciclo && existe === false){
        if(element.go.length > 0){
          element.go.forEach(g => {
            aux.forEach(a => {
              if(g === ciclo && element.name === a){
                existe = true;
                setExisteCiclo('existe');
              }else if(existe === false){
                aux.push(g);
                setExisteCiclo('nao existe');
              }
            });
          });
        }else setExisteCiclo('nao existe');
      }
    });
  }

  const onEuleriano = () => {
    let par = true;
    grafo.forEach(element => {
      if(element.go.length % 2 !== 0){
        par = false;
        setEuleriano('nao euleriano');
      }
    });
    if(par){
      let existe = false;
      grafo.forEach(item => {
        let aux = [];
        let e = item.name;

        grafo.forEach(element => {
          if(element.name === e){
            element.go.forEach(g => {
              aux.push(g);
            });
          }
        });
        grafo.forEach(element => {
          if(existe === false){
            if(element.go.length > 0){
              element.go.forEach(g => {
                aux.forEach(a => {
                  if(g === e && element.name === a){
                    existe = true;
                    setEuleriano('eh euleriano');
                  }else if(existe === false){
                    aux.push(g);
                    setEuleriano('nao euleriano');
                  }
                });
              });
            }else setEuleriano('nao euleriano');
          }
        });
      });
    }
  }

  const onLargura = () => {
    let aux = [];
    aux.push(grafo[0].name);
    grafo.forEach(element => {
      element.go.forEach(g => {
        if(aux.length > 0){
            if(!aux.includes(g)){
              aux.push(g);
              console.log(aux, element.name);
              setArrayLarg(aux)
            }
          }
      });
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
      <br />
      <br />
      <form>
      <label>
        Verificar ciclo
        <br />
        <input type="text" value={ciclo} onChange={(ev) => setCiclo(ev.target.value)} />
      </label>
      </form>
      <button onClick={handleCiclo}>
        Verificar   
      </button>
      <br />
      <label>{existeCiclo}</label>
      <br />
      <br />
      <button onClick={onEuleriano}>
        Euleriano 
      </button>
      <br />
      <label>{euleriano}</label>
      <br />
      <br />
      <button onClick={onLargura}>
        Busca em Largura 
      </button>
      <br />
      {arrayLarg.map((e) => 
        <>
            <label>{`${e} - `}</label>
        </>
      )}
      <br />
      <br />
      <button onClick={() => {}}>
        Busca em Profundidade 
      </button>
      <br />
      <label>{profundidade}</label>
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
