import React from 'react'
import ReactDOM from 'react-dom'
import EOS from 'eosjs'
import EOSClient from '../../lib/eos-client';

import {Button} from 'antd';

const EOS_CONFIG = {
  contractName: "son", // Contract name
  contractReceiver: "mother", // User executing the contract (should be paired with private key)
  clientConfig: {
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
    keyProvider: '5HyyDh4giSMGF4jcW7VdAAYx75N7KsRTND7CRyU9QHEXPjPRbfF', // Your private key
    httpEndpoint: 'http://127.0.0.1:8888', // EOS http endpoint
    broadcast: true,
  sign: true
  }
}

class Wish extends React.Component {
  constructor(props) {
    super(props)
    this.state = { pingStatus: false }
  }

  sendPing() {
    this.setState({ pingStatus: 'loading' })
    let eosClient = EOS.Localnet(EOS_CONFIG.clientConfig)
    // this.eos = new EOSClient('son', 'son');
    //     this.eos
    //   .transaction('wish', {
    //     author: 'son',
    //   })
    //   .then(res => {
    //     console.log(res);
    //     this.setState({ pingStatus: 'success'  });
    //   })
    //   .catch(err => {
    //     this.setState({ pingStatus: 'fail'});
    //     console.log(err);
    //   });

    eosClient.contract(EOS_CONFIG.contractName)
      .then((contract) => {
        contract.wish(EOS_CONFIG.contractReceiver, { authorization: [EOS_CONFIG.contractReceiver] })
          .then((res) => { this.setState({ pingStatus: 'success' }) })
          .catch((err) => { this.setState({ pingStatus: 'fail' }); console.log(err) })
      })
  }

  // deletePost = (pkey, e) => {
  //   this.setState(prevState => ({
  //     posts: prevState.posts.filter((post, index) => post.pkey !== pkey)
  //   }));

  //   this.eos
  //     .transaction('deletepost', {
  //       pkey
  //     })
  //     .then(res => {
  //       console.log(res);
  //       this.setState({ loading: false });
  //     })
  //     .catch(err => {
  //       this.setState({ loading: false });
  //       console.log(err);
  //     });
  // };

  render() {
    if (!this.state.pingStatus){
      return (<Button type="small" onClick={this.sendPing.bind(this)}>发送母亲节祝福</Button>)
    } else if (this.state.pingStatus == "loading") {
      return (<span style={{ color: "gray" }}>祝福发送中...</span>)
    } else if (this.state.pingStatus == "success") {
      return (<span style={{ color: "green" }}>发送成功!</span>)
    } else if (this.state.pingStatus == "fail") {
      return (<span style={{ color: "red" }}>发送失败</span>)
    }
  }
}

export default Wish

