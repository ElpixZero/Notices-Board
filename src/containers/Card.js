import {connect} from 'react-redux';
import Card from '../components/Card';
import cardsActions from '../actions/cards';

const mapActionsToProps = {
  ...cardsActions
};

const mapStateToProps = ({columns}) => ({
  items: columns
});

export default connect(mapStateToProps, mapActionsToProps)(Card);