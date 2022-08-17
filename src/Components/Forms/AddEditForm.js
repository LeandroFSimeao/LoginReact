import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    titulo: '',
    diretor: '',
    genero: '',
    duracao: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('https://pwn-lfos-3.herokuapp.com/api/filmes', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        titulo: this.state.titulo,
        diretor: this.state.diretor,
        genero: this.state.genero,
        duracao: this.state.duracao
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch(`https://pwn-lfos-3.herokuapp.com/api/filmes/${this.state.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        titulo: this.state.titulo,
        diretor: this.state.diretor,
        genero: this.state.genero,
        duracao: this.state.duracao
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, titulo, diretor, genero, duracao } = this.props.item
      this.setState({ id, titulo, diretor, genero, duracao })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="titulo"> Titulo </Label>
          <Input type="text" name="titulo" id="titulo" onChange={this.onChange} value={this.state.titulo === null ? '' : this.state.titulo} />
        </FormGroup>
        <FormGroup>
          <Label for="diretor"> Diretor </Label>
          <Input type="text" name="diretor" id="diretor" onChange={this.onChange} value={this.state.diretor === null ? '' : this.state.diretor}  />
        </FormGroup>
        <FormGroup>
          <Label for="genero">Genero</Label>
          <Input type="text" name="genero" id="genero" onChange={this.onChange} value={this.state.genero === null ? '' : this.state.genero}  />
        </FormGroup>
        <FormGroup>
          <Label for="duracao">Duracao</Label>
          <Input type="number" name="duracao" id="duracao" onChange={this.onChange} value={this.state.duracao === null ? '' : this.state.duracao}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm