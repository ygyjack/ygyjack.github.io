import React, { Component } from 'react';
import { ButtonGroup, Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withTranslation } from 'react-i18next'; // TRANSLATION IN HOC
import { Doughnut, Bar } from 'react-chartjs-2';

class Chart extends Component {
  render() {
    const { t } = this.props;
    const { chart, chartdata, showBar, showPie, onHide } = this.props;
    return (
      <>
        <ButtonGroup aria-label="charts" size="sm">
          <Button variant="outline-info" onClick={ showBar }><FontAwesomeIcon icon="chart-bar" /></Button>
          <Button variant="outline-info" onClick={ showPie }><FontAwesomeIcon icon="chart-pie" /></Button>
        </ButtonGroup>
        { (chart.bar || chart.pie) &&
          <Offcanvas show={chart.bar || chart.pie} onHide={ onHide }>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>{t('chart.label')}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              { chart.bar && <Bar data={chartdata} /> }
              { chart.pie && <Doughnut data={chartdata} /> }
            </Offcanvas.Body>
          </Offcanvas>
        }
      </>
    )
  };
}

export default withTranslation()(Chart);