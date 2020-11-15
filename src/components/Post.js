import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import {
  PostUpdate,
  PostAdded,
  PostDelete,
  CategoryAdded,
} from "../actions/crud";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_posts: [],
      post_title: "",
      update_id: 0,
      category: [],
      all_category: [],
      show: false,
      categoryModal: false,
      setShow: false,
      category_name: "",
    };
  }

  componentDidMount = () => {
    this.setState({
      all_posts: this.props.all_posts,
      all_category: this.props.all_category,
    });
  };

  handleClose = () => {
    this.setState(() => ({
      show: false,
      post_title: "",
      category: [],
      update_id: 0,
    }));
  };

  saveData = () => {
    var submit_data = {
      id: Date.now(),
      title: this.state.post_title,
      category: this.state.category,
    };
    this.props.PostAdded(submit_data);
    this.setState(() => ({
      post_title: "",
      show: false,
      category: [],
      update_id: 0,
    }));
  };

  updateModal = (item) => {
    this.setState(() => ({
      post_title: item.title,
      update_id: item.id,
      category: item.category,
      show: true,
    }));
  };

  updateData = () => {
    var submit_data = {
      id: this.state.update_id,
      category: this.state.category,
      title: this.state.post_title,
    };
    this.props.PostUpdate(submit_data);
    this.setState(() => ({
      post_title: "",
      show: false,
      category: [],
      update_id: 0,
    }));
  };

  removeData = (item) => {
    this.props.PostDelete(item);
    this.setState(() => ({
      post_title: "",
      show: false,
      category: [],
      update_id: 0,
    }));
  };

  getCategoryName = (ids) => {
    return this.props.all_category.map(function (item) {
      return ids.map(function (cat) {
        if (item.id == cat) {
          return item.name + ", ";
        }
      });
    });
  };

  handleShow = () => {
    this.setState(() => ({
      show: true,
      update_id: 0,
      category: [],
      post_title: "",
    }));
  };
  categoryShow = (e) => {
    this.setState(() => ({
      categoryModal: true,
    }));
  };
  categoryclose = () => {
    this.setState(() => ({
      categoryModal: false,
    }));
  };
  saveCategory = () => {
    var submit_data = {
      id: Date.now(),
      name: this.state.category_name,
    };
    this.props.CategoryAdded(submit_data);
    console.log("this.state.category", this.state.category);
    this.setState(() => ({
      category_name: "",
      categoryModal: false,
      category: [...this.state.category, String(submit_data.id)],
    }));
  };
  handleChangeCategory = (e) => {
    const { value } = e.target;

    this.setState({ category_name: value });
  };
  handleChangeText = (e) => {
    const { value } = e.target;

    this.setState({ post_title: value });
  };

  handleChangeSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    if (value.includes("0")) {
      let cat = [
        ...this.state.category, ...value.filter(function (item) {
          return item != "0";
        }),
      ];
      this.setState({
        category: [...new Set(cat)],
      });
    } else {
      let cat = [
        ...value.filter(function (item) {
          return item != "0";
        }),
      ];
      this.setState({
        category: cat,
      });
    }
  };
  static getDerivedStateFromProps(props, state) {
    if (
      props.all_posts != state.all_posts ||
      props.all_category != state.all_category
    ) {
      return {
        all_posts: props.all_posts,
        all_category: props.all_category,
      };
    }
    return null;
  }
  render() {
    //const { all_posts, all_category } = this.props;
    const {
      all_posts,
      all_category,
      post_title,
      category,
      show,
      update_id,
      categoryModal,
      category_name,
    } = this.state;
    return (
      <Container style={{ marginTop: "100px" }}>
        <h2>Post List</h2>
        <Button
          variant="secondary"
          style={{ float: "right", margin: "20px" }}
          onClick={this.handleShow}
        >
          Add new post
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Post Title</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {all_posts.map((item, i) => (
              <tr key={i + 1}>
                <td>{i + 1}</td>
                <td>{item.title}</td>
                <td>{this.getCategoryName(item.category)}</td>
                <td>
                  <Button onClick={() => this.updateModal(item)}>Update</Button>
                  <Button
                    variant="danger"
                    onClick={() => this.removeData(item)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Post {update_id > 0 ? "Update" : "Add"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Post title</Form.Label>
                <Form.Control
                  onChange={this.handleChangeText}
                  type="text"
                  value={post_title}
                  placeholder="Type Post ttle"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Category Select</Form.Label>
                <Form.Control
                  as="select"
                  onChange={this.handleChangeSelect}
                  multiple
                >
                  <option
                    onClick={this.categoryShow}
                    style={{ cursor: "pointer" }}
                    value="0"
                  >
                    Create New Category
                  </option>
                  {all_category.map((item, i) =>
                    category.includes(String(item.id)) ? (
                      <option
                        value={item.id}
                        selected
                        style={{
                          backgroundColor: "rgba(153, 213, 123, 1)",
                          color: "#000",
                        }}
                        key={i}
                      >
                        {item.name}
                      </option>
                    ) : (
                      <option value={item.id} key={i}>
                        {item.name}
                      </option>
                    )
                  )}
                </Form.Control>
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

        <Modal show={categoryModal} onHide={this.categoryclose}>
          <Modal.Header closeButton>
            <Modal.Title>Category Add</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  onChange={this.handleChangeCategory}
                  type="text"
                  value={category_name}
                  placeholder="Type category name"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.categoryclose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.saveCategory}>
              Save
            </Button>
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
  PostAdded: (requestData) => dispatch(PostAdded(requestData)),
  PostUpdate: (requestData) => dispatch(PostUpdate(requestData)),
  PostDelete: (requestData) => dispatch(PostDelete(requestData)),
  CategoryAdded: (requestData) => dispatch(CategoryAdded(requestData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
