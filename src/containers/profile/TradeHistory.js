import BigNumber from 'bignumber.js';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Desktop, Mobile } from '../../generic/MediaQuery';
import Pagination from '../../components/Pagination';
import ReactTable from '../../components/SelectableReactTable';
import { formatDate } from '../../generic/util';
import { injectIntl } from 'react-intl';
import { ProfileBlock, TradeHistoryHelpTooltip } from '../../components/ProfileBlock';

class TradeHistory extends React.Component {
  render() {
    return (
      <Col xs="12" sm="12" md="12" lg="12" xl="8" className="trade-block">
        <Container fluid className="h-100">
          <Row className="h-100">
            <Col className="trade-history">
              <ProfileBlock
                iconClassName='icon-history-clock-button'
                title='profile.tradeHistory'
                Tooltip={TradeHistoryHelpTooltip}
              >
                {this.renderTable()}
              </ProfileBlock>
            </Col>
          </Row>
        </Container>
      </Col>
    );
  }

  getColumns() {
    return [
      {
        id: 'date',
        Header: SortableHeader(this.props.intl.messages['profile.date']),
        accessor: trade => formatDate(new Date(trade.date)),
        minWidth: 50,
        className: 'table_col_value',
        sortable: false,
      },
      {
        Header: SortableHeader(this.props.intl.messages['profile.type']),
        Cell: TradeTypeCell,
        accessor: 'type',
        minWidth: 30,
        className: 'table_col_value text-capitalize',
        sortable: false,
      },
      {
        Header: SortableHeader(this.props.intl.messages['profile.price']),
        Cell: row =>  BigNumber(row.value).dp(8).toFixed() + ' ' + row.original.mainCurrency,
        accessor: 'price',
        className: 'table_col_value',
        sortable: false,
      },
      {
        Header: SortableHeader(this.props.intl.messages['profile.amount']),
        id: 'amount',
        accessor: 'amount',
        Cell: row =>  BigNumber(row.value).toFixed() + ' ' + row.original.amountCurrency,
        className: 'table_col_value',
        sortable: false,
      },
      {
        Header: SortableHeader(this.props.intl.messages['profile.total']),
        Cell: row =>  BigNumber(row.value).dp(8).toFixed() + ' ' + row.original.mainCurrency,
        accessor: 'total',
        className: 'table_col_value',
        sortable: false,
      },
    ];
  }
  renderTable() {
    const data = this.props.trades
      .sort((t1, t2) => t2.date - t1.date)
      .reduce((accum, value) => {
        if(value.length) {
          const first = value[0];
          const updatedFirst = {...first, first: true};
          value = value.slice(1);
          value.unshift(updatedFirst);
        }
        return accum.concat(value);
      }, []);
    return (
      <div>
        <Desktop>
          <div  className="profile_table_wrapper">
            <ReactTable
              getTrProps={(state, rowInfo) => {
                if(rowInfo.original.first) {
                  return {
                    className: 'first-row'
                  };
                } else {
                  return {};
                }
              }}
              data={data}
              className="profile_table"
              onItemSelected={() => {}}
              columns={this.getColumns()}
              scrollBarHeightAuto='true'
            />
          </div>
        </Desktop>
        <Mobile>
          <div>
            <ReactTable
              getTrProps={(state, rowInfo, column, instance) => {
                if(rowInfo && rowInfo.original.first) {
                  return {
                    className: 'first-row'
                  };
                } else {
                  return {};
                }
              }}
              data={data}
              onItemSelected={() => {}}
              columns={this.getColumns()}
              minRows={5}
              showPagination={true}
              defaultPageSize={5}
              PaginationComponent={Pagination}
            />
          </div>
        </Mobile>
      </div>
    );

  }
}

const SortableHeader = (header, showSort = true) => (
  <div className="table_header_wrapper contract_header_wrapper">
    <span className="table_header">{header}</span>
  </div>
);

const TradeTypeCell = row => {
  const className = row.original.type === 'buy' ? 'green' : 'red';
  return (<div className={className}>{row.original.type}</div>);
};

export default injectIntl(TradeHistory);
