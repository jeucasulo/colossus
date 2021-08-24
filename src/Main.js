// import './Main.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { getAccessToken } from '../../backend/src/controllers/BraintreeController';



function Main() {
  const [count, setCount] = React.useState(0);
  const [connectUrlRes, setConnectUrlRes] = React.useState([""]);
  const [getCodeRes, setGetCodeRes] = React.useState([""]);
  const [getAccessTokenFinalRes, setGetAccessTokenFinalRes] = React.useState([""]);
  const [amount, setAmount] = React.useState([""]);
  const [orderId, setOrderId] = React.useState([""]);
  const [sharedPaymentMethodToken, setSharedPaymentMethodToken] = React.useState([""]);


  const [authorizationStatus, setAuthorizationStatus] = React.useState(false);

  const getConnectURL = async () => {

    // const connectURL = await axios.get('http://localhost:3333/get-connect-url');
    const connectURL = await axios.get('https://colossus-backend.herokuapp.com/get-connect-url');
    setConnectUrlRes(connectURL.data.msg);
    setAuthorizationStatus(true);

  }

  const getCodeFromDb = async () => {
    console.log('getCodeFromDb');
    const codeFRomDb = await axios.get('https://colossus-backend.herokuapp.com/get-code-from-db');
    console.log(codeFRomDb);
    setGetCodeRes(codeFRomDb.data.msg.accessTokenData);
  }
  const getAccessTokenFinal = async () => {
    console.log('getCodeFromDb');
    let urlToGetAccessTokenFinal = "https://colossus-backend.herokuapp.com/get-access-token?codeFromQueryString=" + getCodeRes;
    console.log(urlToGetAccessTokenFinal);
    const accessTokenFinal = await axios.get(urlToGetAccessTokenFinal);
    console.log(accessTokenFinal);
    setGetAccessTokenFinalRes(JSON.stringify(accessTokenFinal.data.msg, "", 2));
    // setAuthorizationStatus(true);
  }


  const payment = async () => {
    // let useAccessTokenForMerchant = getAccessTokenFinalRes.credentials.accessToken;
    let useAccessTokenForMerchant = getAccessTokenFinalRes.msg.credentials.accessToken;
    console.log(sharedPaymentMethodToken);
    let transaction = "https://colossus-backend.herokuapp.com/transaction?amount=" + amount + "&orderId=" + orderId + "&useAccessTokenForMerchant=" + useAccessTokenForMerchant;
    console.log(transaction);
    // const transactionRes = await axios.get(transaction);
    console.log(amount);
    console.log('payment');
    console.log(getAccessTokenFinalRes);

    // {
    //   credentials: OAuthCredentials {
    //     accessToken: 'access_token$sandbox$kq7t3257dqmnpjrz$f2e0707e0990530f035191546b37ec3e',
    //       refreshToken: 'refresh_token$sandbox$kq7t3257dqmnpjrz$267dc42afb4fda2f5af3d96d13658b8d',
    //         tokenType: 'bearer',
    //           expiresAt: '2021-08-23T01:47:23Z',
    //             scope: 'shared_vault_transactions'
    //   },
    //   success: true
    // }



  }


  function handleAmountChange(e) {
    // console.log(e.target.value);
    setAmount(e.target.value);
    console.log('novo valor do amount');
    console.log(amount);
  }

  function handleOrderIdChange(e) {
    // console.log(e.target.value);
    setOrderId(e.target.value);
    console.log('novo valor do orderId');
    console.log(orderId);
  }




  return (

    <div className="">



      {/* <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      {count} */}




      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">OAuth Flow</a>
          {/*
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li>
              </ul>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div> */}
        </div>
      </nav>
      <div className="container">




        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <br />
        <br />
        <br />
        <p>
          OAuth Flow
        </p>
        <br />
        <br />
        <div className="accordion" id="accordionExample">


          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                Create Connect URL (ConectCar)
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <span className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-server" viewBox="0 0 16 16">
                    <path d="M1.333 2.667C1.333 1.194 4.318 0 8 0s6.667 1.194 6.667 2.667V4c0 1.473-2.985 2.667-6.667 2.667S1.333 5.473 1.333 4V2.667z" />
                    <path d="M1.333 6.334v3C1.333 10.805 4.318 12 8 12s6.667-1.194 6.667-2.667V6.334a6.51 6.51 0 0 1-1.458.79C11.81 7.684 9.967 8 8 8c-1.966 0-3.809-.317-5.208-.876a6.508 6.508 0 0 1-1.458-.79z" />
                    <path d="M14.667 11.668a6.51 6.51 0 0 1-1.458.789c-1.4.56-3.242.876-5.21.876-1.966 0-3.809-.316-5.208-.876a6.51 6.51 0 0 1-1.458-.79v1.666C1.333 14.806 4.318 16 8 16s6.667-1.194 6.667-2.667v-1.665z" />
                  </svg>
                </span>
                <br />
                <br />
                <div className="row">

                  <div className="col">
                    <div className="text-start text-muted">
                      {/* <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow. */}
                      <h6>const gateway = new braintree.BraintreeGateway(&#123;</h6>
                      <h6>&emsp;clientId: CLIENT_ID</h6>
                      <h6>&emsp;clientSecret: CLIENT_SECRET</h6>
                      <h6>&#125;);</h6>

                      <br />

                      <h6>const url = gateway.oauth.connectUrl(&#123;</h6>
                      <h6>&emsp;redirectUri: "https://www.example.com/",</h6>
                      <h6>&emsp;scope: "shared_vault_transactions,transaction:manage_settlement",</h6>
                      <h6>&#125;);</h6>
                    </div>

                    <br />

                    <button className="btn btn-success" onClick={getConnectURL}>
                      Get Connect URL
                    </button>

                  </div>

                  <div className="col">
                    {/* <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow. */}
                    <textarea className="form-control" id="" cols="30" rows="10" placeholder='Waiting' value={connectUrlRes}>
                    </textarea>



                  </div>
                </div>
              </div>
            </div>
          </div>




          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Authorization (Ipiranga)
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-check-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </span>
                <br />

                <br />
                {/* <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow. */}
                <p>The Grant API uses OAuth to connect a granting Braintree merchant and a receiving Braintree merchant.

                  Once the recipient goes through these flows and consents to receiving granted payment methods, the grantor will receive an access_token. This token contains encoded information about the recipient, information to the Grant API connection, and the actions the grantor can take on the recipient's behalf.

                  To use the Grant API with the recipient, the access_token must include the right to grant payment methods to that merchant. When setting the connect_url, the grantor must include the OAuth scope grant_payment_method.

                </p>

                <a style={{ pointerEvents: authorizationStatus ? 'auto' : 'none' }} className="btn btn-success" href={connectUrlRes} target="_blank">Authorization</a>

              </div>
            </div>
          </div>




          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Get Code from URL (ConectCar)
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <span className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-server" viewBox="0 0 16 16">
                    <path d="M1.333 2.667C1.333 1.194 4.318 0 8 0s6.667 1.194 6.667 2.667V4c0 1.473-2.985 2.667-6.667 2.667S1.333 5.473 1.333 4V2.667z" />
                    <path d="M1.333 6.334v3C1.333 10.805 4.318 12 8 12s6.667-1.194 6.667-2.667V6.334a6.51 6.51 0 0 1-1.458.79C11.81 7.684 9.967 8 8 8c-1.966 0-3.809-.317-5.208-.876a6.508 6.508 0 0 1-1.458-.79z" />
                    <path d="M14.667 11.668a6.51 6.51 0 0 1-1.458.789c-1.4.56-3.242.876-5.21.876-1.966 0-3.809-.316-5.208-.876a6.51 6.51 0 0 1-1.458-.79v1.666C1.333 14.806 4.318 16 8 16s6.667-1.194 6.667-2.667v-1.665z" />
                  </svg>
                </span>
                <br />

                <div className="row">
                  <div className="col">
                    Check for the Code
                    <br />
                    <br />
                    <br />
                    <button style={{ pointerEvents: authorizationStatus ? 'auto' : 'none' }} className="btn btn-success" onClick={getCodeFromDb}>Check</button>
                  </div>
                  <div className="col">
                    <textarea className="form-control" id="" cols="30" rows="10" placeholder='Waiting' value={getCodeRes}>
                    </textarea>


                  </div>
                </div>

                {/* <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow. */}
              </div>
            </div>
          </div>


          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                Get Access Token (ConectCar)
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <span className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-server" viewBox="0 0 16 16">
                    <path d="M1.333 2.667C1.333 1.194 4.318 0 8 0s6.667 1.194 6.667 2.667V4c0 1.473-2.985 2.667-6.667 2.667S1.333 5.473 1.333 4V2.667z" />
                    <path d="M1.333 6.334v3C1.333 10.805 4.318 12 8 12s6.667-1.194 6.667-2.667V6.334a6.51 6.51 0 0 1-1.458.79C11.81 7.684 9.967 8 8 8c-1.966 0-3.809-.317-5.208-.876a6.508 6.508 0 0 1-1.458-.79z" />
                    <path d="M14.667 11.668a6.51 6.51 0 0 1-1.458.789c-1.4.56-3.242.876-5.21.876-1.966 0-3.809-.316-5.208-.876a6.51 6.51 0 0 1-1.458-.79v1.666C1.333 14.806 4.318 16 8 16s6.667-1.194 6.667-2.667v-1.665z" />
                  </svg>
                </span>
                <br />

                <div className="row">

                  <div className="col">
                    <button onClick={getAccessTokenFinal} className="btn btn-success">GetAccessToken</button>
                  </div>
                  <div className="col">
                    <textarea className="form-control" name="" id="" cols="30" rows="10" value={getAccessTokenFinalRes}></textarea>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                Transactions <span className="me-auto">(ConectCar)</span>
              </button>
            </h2>
            <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <span className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-server" viewBox="0 0 16 16">
                    <path d="M1.333 2.667C1.333 1.194 4.318 0 8 0s6.667 1.194 6.667 2.667V4c0 1.473-2.985 2.667-6.667 2.667S1.333 5.473 1.333 4V2.667z" />
                    <path d="M1.333 6.334v3C1.333 10.805 4.318 12 8 12s6.667-1.194 6.667-2.667V6.334a6.51 6.51 0 0 1-1.458.79C11.81 7.684 9.967 8 8 8c-1.966 0-3.809-.317-5.208-.876a6.508 6.508 0 0 1-1.458-.79z" />
                    <path d="M14.667 11.668a6.51 6.51 0 0 1-1.458.789c-1.4.56-3.242.876-5.21.876-1.966 0-3.809-.316-5.208-.876a6.51 6.51 0 0 1-1.458-.79v1.666C1.333 14.806 4.318 16 8 16s6.667-1.194 6.667-2.667v-1.665z" />
                  </svg>
                </span>
                <br />
                <br />
                <div className="row">
                  <div className="col">
                    <h6>Amount</h6>
                    <input type="number" onChange={handleAmountChange} />
                    <h6>OrderID</h6>
                    <input type="text" onChange={handleOrderIdChange} />
                    <br />
                    <br />
                    <button type="button" className="btn btn-success" onClick={payment}>Payment</button>
                    <br />


                  </div>
                  <div className="col">
                    <textarea className="form-control" id="" cols="30" rows="10" placeholder='Waiting'></textarea>
                  </div>

                </div>

                {/* <strong>This is the fourth item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow. */}
              </div>
            </div>
          </div>


        </div>

        <br />
        <br />
        <br />

        {/* <a
            className="App-link"
            href="https://developer.paypal.com/braintree/docs/guides/extend/grant-api/overview"
            target="_blank"
            rel="noopener noreferrer"
          >
            Reference
          </a>
 */}

      </div>

    </div >
  );
}

export default Main;
