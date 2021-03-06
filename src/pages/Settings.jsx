import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';
import InputCard from '../components/InputCard';
import Select from '../components/Select';
import { actionAddSetting } from '../redux/actions';
import QuestionIcons from '../components/QuestionIcons';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      // error: '',
      categoriesData: [],
      category: 'General Knowledge',
      loading: true,
      amount: 5,
      difficulty: 'any difficulty',
      type: 'any type',
    };

    this.getCategory = this.getCategory.bind(this);
    this.onHandlerChange = this.onHandlerChange.bind(this);
    this.addSetting = this.addSetting.bind(this);
  }

  componentDidMount() {
    this.getCategory();
  }

  onHandlerChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  getCategory() {
    this.setState({ loading: true }, async () => {
      const resp = await fetch('https://opentdb.com/api_category.php');
      // if (!resp.ok) this.setState({ error: 'ocorreu um erro com a requisição' });
      const { trivia_categories: categoriesData } = await resp.json();
      this.setState({ categoriesData, loading: false });
    });
  }

  addSetting() {
    const { dispatchSetting } = this.props;
    const { category, categoriesData, amount, difficulty, type } = this.state;
    const { id } = categoriesData.find(({ name }) => name === category);
    const { player } = JSON.parse(localStorage.getItem('state'));
    localStorage.setItem('state', JSON.stringify({ player: { ...player, amount } }));
    dispatchSetting({ id, amount, difficulty, type });
  }

  render() {
    const { categoriesData, category, loading, amount, difficulty, type } = this.state;
    const categories = categoriesData.map(({ name }) => name);
    if (loading) { return <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt="loading" />; }
    return (
      <div className="config-container">
        <header className="header-config">
          <h1 className="settings-title" data-testid="settings-title"> Configurações </h1>
        </header>
        <form onSubmit={ this.addSetting }>
          <Select
            labelText="Selecione uma categoria"
            id="category-input"
            name="category"
            value={ category }
            change={ this.onHandlerChange }
            options={ categories }
          />
          <Select
            labelText="Selecione a dificuldade:"
            id="difficulty-input"
            name="difficulty"
            value={ difficulty }
            change={ this.onHandlerChange }
            options={ ['any difficulty', 'easy', 'medium', 'hard'] }
          />
          <Select
            labelText="Selecione um tipo de questão:"
            id="type-input"
            name="type"
            value={ type }
            change={ this.onHandlerChange }
            options={ ['any type', 'multiple choice', 'true/false'] }
          />
          <InputCard
            labelText="Quantidade de perguntas:"
            id="amount"
            name="amount"
            type="number"
            value={ amount }
            onChange={ this.onHandlerChange }
          />
          <Link to="/">
            <button type="button" onClick={ this.addSetting }>Aplicar</button>
          </Link>
        </form>
        <QuestionIcons />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSetting: (data) => dispatch(actionAddSetting(data)),
});

export default connect(null, mapDispatchToProps)(Settings);

Settings.propTypes = {
  dispatchSetting: func.isRequired,
};
