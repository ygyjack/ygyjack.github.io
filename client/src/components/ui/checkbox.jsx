import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Checkbox({ show }) {
  const checked = (show.selectId.indexOf(show.id) >= 0) ? 'check-circle' : 'dot-circle';
  const style = (show.selectId.indexOf(show.id) >= 0) ? 'text-danger' : 'text-light';
  return (<h4>
    <FontAwesomeIcon className={style} icon={checked} />
  </h4>);
}