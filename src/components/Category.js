import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { CategoryUpdate, CategoryAdded, CategoryDelete } from "../actions/crud";

import { connect } from "react-redux";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_name: "",
      update_id: 0,
      all_category: [],
      show: false,
      setShow: false,
    };
  }
  handleClose = () => {
    this.setState(() => ({
      show: false,
      category_name: "",
      update_id: 0,
    }));
  };

  saveData = () => {
    var submit_data = {
      id: Date.now(),
      name: this.state.category_name,
    };
    this.props.CategoryAdded(submit_data);
    this.setState(() => ({
      category_name: "",
      show: false,
      update_id: 0,
    }));
  };

  updateModal = (item) => {
    this.setState(() => ({
      category_name: item.name,
      update_id: item.id,
      show: true,
    }));
  };

  updateData = () => {
    var submit_data = {
      id: this.state.update_id,
      name: this.state.category_name,
    };
    this.props.CategoryUpdate(submit_data);
    this.setState(() => ({
      category_name: "",
      show: false,
      update_id: 0,
    }));
  };

  removeData = (item) => {
    this.props.CategoryDelete(item);
    this.setState(() => ({
      category_name: "",
      show: false,
      update_id: 0,
    }));
  };

  handleShow = () => {
    this.setState(() => ({
      show: true,
      update_id: 0,
      category_name: "",
    }));
  };
  handleChangeText = (e) => {
    const { value } = e.target;

    this.setState({ category_name: value });
  };
  render() {
    const { all_category } = this.props;
    const { category_name, show, update_id } = this.state;
    return (
      <Container style={{ marginTop: "100px" }}>
        <h2>Category List</h2>
        <Button
          variant="secondary"
          style={{ float: "right", margin: "20px" }}
          onClick={this.handleShow}
        >
          Add new category
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {all_category.map((item, i) => (
              <tr key={i + 1}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>
                  <Button onClick={() => this.updateModal(item)}>Update</Button>
                  <Button variant="danger" onClick={() => this.removeData(item)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Category {update_id > 0 ? "Update" : "Add"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  onChange={this.handleChangeText}
                  type="text"
                  value={category_name}
                  placeholder="Type category name"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            {update_id > 0 ? (
              <Button variant="primary" onClick={this.updateData}>
                Update
              </Button>
            ) : (
              <Button variant="primary" onClick={this.saveData}>
                Save
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  all_posts: state.data.all_post,
  all_category: state.data.all_category,
});

const mapDispatchToProps = (dispatch) => ({
  CategoryAdded: (requestData) => dispatch(CategoryAdded(requestData)),
  CategoryUpdate: (requestData) => dispatch(CategoryUpdate(requestData)),
  CategoryDelete: (requestData) => dispatch(CategoryDelete(requestData)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
