import { Component } from "react";
import { connect } from "react-redux";
import Carousel from "./Carousel";
import Modal from "./Modal";
import { useNavigate, useParams } from "react-router-dom";

class Details extends Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    console.log("details mounting");
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const {
      animal,
      breed,
      city,
      state,
      description,
      name,
      images,
      showModal,
    } = this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <button
            onClick={this.toggleModal}
            style={{ backgroundColor: this.props.theme }}
          >
            Adopt {name}
          </button>
          <button
            onClick={() => this.props.navigate("/")}
            style={{ backgroundColor: this.props.theme }}
          >
            Go Back
          </button>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ theme }) => ({ theme });

const ReduxWrappedDetails = connect(mapStateToProps)(Details);

const WrappedDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  return (
 
      <ReduxWrappedDetails params={params} navigate={navigate} />
   
  );
};

export default WrappedDetails;



