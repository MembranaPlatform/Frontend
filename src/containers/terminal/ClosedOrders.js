import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from '../../components/SelectableReactTable';

export class ClosedOrders extends React.Component {

  columns = [
    {
      Header: 'Pair/Exchange',
      Cell: (row) => <OpenOrdersCell title={row.original.symbol} subtitle={row.original.exchange} />,
    },
    {
      id: 'type',
      Header: 'Side/Type',
      Cell: (row) => <OpenOrdersCell
        className={classNames('openordercell', row.original.type)}
        title={row.original.type} subtitle={row.original.orderType || 'limit'}
      />,
      minWidth: 60,
    },
    {
      id: 'amount',
      Header: 'Amount',
      Cell: (row) => <OpenOrdersCell title={row.original.amount} />,
      minWidth: 60,
    },
    {
      id: 'price',
      Header: 'Price',
      Cell: (row) => {
        if (row.original.stopPrice) {
          const subtitle = row.original.condition === 'PRICE_HIGHER' ?
            `>=${row.original.stopPrice}` :
            `<=${row.original.stopPrice}`;
          return <OpenOrdersCell title={row.original.limit} subtitle={subtitle} />;
        } else {
          return <OpenOrdersCell title={row.original.limit} />;
        }
      },
      minWidth: 60,
    },
    {
      id: 'filled',
      Header: 'Filled',
      Cell: (row) => <OpenOrdersCell title={row.value + '%'} />,
      accessor: (row) => (row.filled / row.amount * 100).toFixed(2),
    },
    {
      id: 'time',
      Header: 'Time/Date',
      Cell: (row) => <OpenOrdersCell title={row.value.toLocaleTimeString()} subtitle={row.value.toLocaleDateString()} />,
      accessor: (info) => new Date(info.dt),
    }
  ]

  render() {
    return (
      <ReactTable
        onItemSelected={() => {}}
        columns={this.columns}
        style={{height: 333}}
        scrollBarHeight={317}
        data={this.props.orders}
      />
    );
  }
}
function OpenOrdersCell(props) {
  const {title, subtitle, className} = props;
  return (
    <div className={className || 'openordercell'}>
      <div className="title">{title}</div>
      <div className="subtitle">{subtitle}</div>
    </div>
  );
}

ClosedOrders.propTypes = {
  orders: PropTypes.array.isRequired,
};
