import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DownloadList from './component';
import { getServerState } from 'src/containers/Server/actions';

const mapStateToProps = state =>
  console.log(state.serverState) || {
    queue: state.serverState.queue,
    downloads: state.serverState.downloads,
  };

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getServerState,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(DownloadList);
