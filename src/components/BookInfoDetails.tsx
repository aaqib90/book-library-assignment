import React from 'react';

class bookInfoDetails extends React.Component<any, any>  {
    constructor(props:any) {
        super(props);
        this.state ={
            disabled: this.props.addForm ? false: true,
            $loki: "",
            name: "",
            description: "",
            count: "",
            author: "",
            btnText: "Update"
        }
    }

    componentDidMount() {
        if(this.props.selectedBookInfo) {
            this.setState({
                $loki: this.props.selectedBookInfo.$loki,
                name: this.props.selectedBookInfo.name,
                description: this.props.selectedBookInfo.description,
                count: this.props.selectedBookInfo.count,
                author: this.props.selectedBookInfo.author
            })
        }
    }

    componentWillReceiveProps(nextProps:any) {
        if(this.props.selectedBookInfo) {
            this.setState({
                $loki: nextProps.selectedBookInfo.$loki,
                name: nextProps.selectedBookInfo.name,
                description: nextProps.selectedBookInfo.description,
                count: nextProps.selectedBookInfo.count,
                author: nextProps.selectedBookInfo.author
            });
        }
    }

    onButtonClick = () => {
        this.setState({
            disabled : !this.state.disabled,
            btnText: this.state.btnText === "Update" ? "Cancel" : "Update"
        })
    }

    handleChange =(e:any) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveClick = () => {
        const obj: any = {
            name: this.state.name,
            description: this.state.description,
            count: this.state.count,
            author: this.state.author
        }
        if(!this.props.addForm)
            obj['$loki'] = this.state.$loki
        this.props.updateBookHandler(obj);
        if(!this.props.addForm) {
            this.setState({
                disabled : !this.state.disabled,
                btnText: this.state.btnText === "Update" ? "Cancel" : "Update",
            })
        }
    }

    render() {
        return (
            <div className="container">
                <h3>Book Information</h3>
                <div className="col-25">
                    <label>Name</label>
                </div>
                <div className="col-75">
                    <input type="text" placeholder="Name" disabled={this.state.disabled} value={this.state.name || ''} name="name" onChange={this.handleChange} />
                </div>    
                <div className="col-25">
                    <label>Description</label>
                </div>
                <div className="col-75">
                    <textarea  placeholder="Description" disabled={this.state.disabled} value={this.state.description || ''} name="description" onChange={this.handleChange}></textarea>
                </div>
                <div className="col-25">
                    <label>Count</label>
                </div>
                <div className="col-75">
                    <input type="number" placeholder="Count" disabled={this.state.disabled} value={this.state.count || ''} name="count" onChange={this.handleChange} />
                </div>
                <div className="col-25">
                    <label>Author</label>
                </div>
                <div className="col-75">
                    <input type="text" placeholder="Author" disabled={this.state.disabled} value={this.state.author || ''}  name="author" onChange={this.handleChange}/>
                </div>
                {!this.props.addForm ? <div>
                    <button onClick={this.onButtonClick}>{this.state.btnText}</button>
                </div>: ""
                }
                {this.props.addForm ?  <div>
                    <button name="add" onClick={this.saveClick}>Add</button>
                </div>: ""}
                {this.state.btnText === "Cancel" ? <div>
                    <button name="save" onClick={this.saveClick}>Save</button>
                </div>: ""} 
            </div>
        )
    }
}

export default bookInfoDetails
