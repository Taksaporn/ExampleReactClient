﻿class ProductCategoryRow extends React.Component {
    render() {
        return <tr><th colSpan="2">{this.props.category}</th></tr>;
    }
}

class ProductRow extends React.Component {
    render() {
        var name = this.props.product.stocked ?
          this.props.product.name :
          <span style={{color: 'red'}}>
            {this.props.product.name}
          </span>;
        return (
          <tr>
            <td>{name}</td>
            <td>{this.props.product.price}</td>
          </tr>
        );
    }
}

class ProductTable extends React.Component {
    render() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function(product) {
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
        }
          rows.push(<ProductRow product={product} key={product.name} />);
        lastCategory = product.category;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
    }
}

class SearchBar extends React.Component {
    render() {
        return (
          <form>
            <input type="text" placeholder="Search..." />
            <p>
              <input type="checkbox" />
              {' '}
        Only show products in stock
      </p>
    </form>
      );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }
    loadProductsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this)
        });
    }
    componentDidMount() {
        this.loadProductsFromServer();
    }
    render() {
        return (
          <div>
            <SearchBar />
            <ProductTable products={this.state.data} />
      </div>
    );
      }
}


ReactDOM.render(
  <FilterableProductTable url="http://localhost:54529/api/Product/"  pollInterval={2000} />,
  document.getElementById('container')
);
