function Schedule() {
  return (
    <section id="schedule" className="section alternate">
      <div className="container">
        <h2>Conference Schedule</h2>

        <div className="schedule">

          <div className="schedule-item">
            <span>09:00 AM</span>
            <div>
              <h3>Registration</h3>
              <p>Participant registration and welcome.</p>
            </div>
          </div>

          <div className="schedule-item">
            <span>10:00 AM</span>
            <div>
              <h3>Opening Ceremony</h3>
              <p>Welcome address and inauguration.</p>
            </div>
          </div>

          <div className="schedule-item">
            <span>11:00 AM</span>
            <div>
              <h3>Keynote Session</h3>
              <p>Emerging technologies and future innovations.</p>
            </div>
          </div>

          <div className="schedule-item">
            <span>02:00 PM</span>
            <div>
              <h3>Technical Sessions</h3>
              <p>Research presentations and discussions.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Schedule;