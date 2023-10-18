import UserService from "../service/user.service.js";

export class UserController {
  userService = new UserService();

  register = async (req, res) => {
    let { firstName, lastName, email, password, image, rolId } = req.body;
    let user = await this.userService.register({
      firstName,
      lastName,
      email,
      password,
      image,
      rolId,
    });

    res.json({
      data: user,
    });
  };
  login = async (req, res) => {
    let { email, password } = req.body;
    let user = await this.userService.login({ email, password });

    res.json({
      data: user,
    });
  };
  update = async (req, res) => {
    let { firstName, lastName, email, image } = req.body;
    let user = await this.userService.update(
      {
        firstName,
        lastName,
        image,
      },
      email
    );

    res.json({
      data: user,
    });
  };
  delete = async (req, res) => {
    let user = await this.userService.delete(req.params.id);

    res.json({
      data: user,
    });
  };
}
