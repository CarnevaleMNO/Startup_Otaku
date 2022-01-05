import { Link } from "remix";

export default function ContactPage() {
  return (
    <div className="contact-page">
      <Link to="">
        <div className="top">
          <i class="fab fa-twitter"></i>
          <h1>We check all tweets!</h1>
        </div>
        <div className="bottom">
          <a
            href="https://twitter.com/TwitterDev?ref_src=twsrc%5Etfw"
            class="twitter-follow-button"
            data-show-count="false"
          >
            Follow @TwitterDev
          </a>
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charset="utf-8"
          ></script>
        </div>
      </Link>
    </div>
  );
}
