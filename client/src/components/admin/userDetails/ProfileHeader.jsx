import React, { Component } from "react";
import isEmpty from "../../../validation/is-empty";

export default class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="page-header">
        <div className="ibox flex-1">
          <div className="ibox-body">
            <div className="flexbox">
              <div className="flexbox-b">
                <div className="ml-5 mr-5">
                  <img
                    className="img-circle"
                    src={profile.user.avatar}
                    alt={profile.user.name}
                    width="110"
                  />
                </div>
                <div>
                  <h4>{profile.user.name}</h4>
                  <div className="text-muted font-13 mb-3">
                    <span className="mr-3">
                      <i className="ti-location-pin mr-2" />
                      {isEmpty(profile.country) ? null : (
                        <span> {profile.country}</span>
                      )}
                    </span>
                    <span>
                      <i className="ti-calendar mr-2" />
                      {isEmpty(profile.date) ? null : (
                        <span> {profile.date}</span>
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="mr-3">
                      <span
                        className="badge badge-primary badge-circle mr-2 font-14"
                        style={{ height: "30px", width: "30px" }}
                      >
                        <i className="ti-mobile" />
                      </span>
                      {isEmpty(profile.telephone) ? null : (
                        <span> {profile.telephone}</span>
                      )}
                    </span>
                    <span>
                      <span
                        className="badge badge-pink badge-circle mr-2 font-14"
                        style={{ height: "30px", width: "30px" }}
                      >
                        <i className="ti-briefcase" />
                      </span>
                      {isEmpty(profile.modetransfer) ? null : (
                        <span>{profile.modetransfer}</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-inline-flex">
                <div className="px-4 text-center">
                  <div className="text-muted font-13">Amount</div>
                  <div className="h2 mt-2">
                    {isEmpty(profile.amount) ? (
                      "0"
                    ) : (
                      <span>{profile.amount}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="nav nav-tabs tabs-line m-0 pl-5 pr-3">
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab">
                Overview
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab">
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab">
                Settings
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab">
                Activity
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
