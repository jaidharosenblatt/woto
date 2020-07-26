import React from "react";
import { Space } from "antd";
import "./legal.css";

const Guidelines = () => {
  return (
    <div className="legal-container">
      <Space direction="vertical">
        <h1>Woto User Guidelines</h1>
        <p>
          To be transparent about what is and isn&rsquo;t allowed on Woto,
          we&rsquo;ve put together this set of guidelines. The following
          activity/material isn&rsquo;t permitted:
        </p>
        <ul>
          <li>Illegal content and conduct. Self-explanatory.</li>
          <li>
            Intellectual property infringement. A good rule of thumb is to ask
            the rights holder for permission before publishing content
            you&rsquo;re not sure about.
          </li>
          <li>
            Pornography. We know that there may be different definitions of
            this, but generally, we define pornography as visual depictions of
            sexually explicit acts. Nudity, in and of itself, is fine.
          </li>
          <li>
            Technologically harmful content. Please don&rsquo;t upload or link
            to malware, spyware, adware, or other malicious or destructive code.
          </li>
          <li>
            Impersonation. Don&rsquo;t claim to be a person or organization
            you&rsquo;re not. (Parody and satire are ok though!)
          </li>
          <li>
            Directly threatening material. We don&rsquo;t tolerate direct and
            realistic threats of violence. (This doesn&rsquo;t mean that
            we&rsquo;ll remove all hyperbole or offensive language.)
          </li>
          <li>
            Posting private information. Don&rsquo;t share someone&rsquo;s
            personal information without their consent.
          </li>
          <li>
            Spam or machine-generated content. You know what this is, and keep
            in mind that we don&rsquo;t want you to pollute the web outside of
            Cloudup either, so we ask you to please avoid sending unwanted or
            unsolicited promotions or emails that include your Cloudup content.
          </li>
          <li>
            Content or conduct that overburdens our systems. For example,
            excessive resource consumption.
          </li>
        </ul>
        <p>
          <strong>
            Bear in mind that these are just guidelines &mdash; interpretations
            are up to us. These guidelines are not exhaustive and are subject to
            change.
          </strong>
        </p>
        <p>
          If you believe a Woto user has violated our Terms of Service or any of
          these policies, please report the site by emailing{" "}
          <strong>woto.app@gmail.com</strong>.
        </p>
        <p>
          If we&rsquo;re not in a position to make a determination (for example,
          whether something is defamatory or not), we defer to the judgment of a
          court.
        </p>
      </Space>
    </div>
  );
};

export default Guidelines;
