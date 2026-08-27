function Registration() {
  return (
    <section id="registration" className="section">
      <div className="container">

        <h2>Registration</h2>

        <form className="registration-form">

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Institution</label>
            <input
              type="text"
              placeholder="Enter your institution"
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <select>
              <option>Student</option>
              <option>Researcher</option>
              <option>Faculty</option>
              <option>Industry Professional</option>
            </select>
          </div>

          <button type="submit" className="button">
            Register
          </button>

        </form>

      </div>
    </section>
  );
}

export default Registration;