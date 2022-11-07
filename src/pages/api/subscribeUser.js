export default async (req, res) => {
  const email = req.body['email'];
  const fname = req.body['fname'];
  if (!email) {
    return res.status(400).json({ error: 'Please fill out your email address' });
  }

  try {
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const DATACENTER = process.env.MAILCHIMP_API_SERVER;
    const data = {
      email_address: email,
      full_name: fname,
      status: 'subscribed',
    };

    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,

      {
        body: JSON.stringify(data),
        headers: {
          Authorization: `apikey ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );

    if (response.status >= 400) {
      const responseErrorMessage = await response.json();
      var returnErrorMessage = `There was an error subscribing to the newsletter.
        Hit us up at news@facingwavesmusic.com and we'll add you the old fashioned way.`;

      if (responseErrorMessage.title === 'Member Exists') {
        returnErrorMessage = `You are already subscribed to our newsletter with this email address.`;
      }

      return res.status(400).json({
        error: returnErrorMessage,
      });
    }

    return res.status(201).json({ error: '' });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};
