const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

// POST - Registrera en ny användare ( namn behövs för att skapa kontot )
exports.register = async (request, h) => {
    try {
        const { name, email, password } = request.payload;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return h.response({ error: 'E-postadressen är redan registrerad' }).code(400);
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        return h.response({ 
            message: 'Användare registrerad framgångsrikt!',
            user: { id: newUser._id, name: newUser.name, email: newUser.email }
        }).code(201);

    } catch (err) {
        return h.response({ error: err.message }).code(400);
    }
};

// POST - Logga in användare (vid inloggning behövs bara namn och lösenord)
exports.login = async (request, h) => {
    try {
        const { email, password } = request.payload; 

        // 1. Sök efter användaren med e-post
        const user = await User.findOne({ email });
        if (!user) {
            return h.response({ error: 'Felaktig e-postadress eller lösenord' }).code(401);
        }

        // 2. Kontrollera lösenordet
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return h.response({ error: 'Felaktig e-postadress eller lösenord' }).code(401);
        }

        // 3. Skapa JWT-token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // 4. Skicka tillbaka token till Vue
        return h.response({
            message: 'Inloggning lyckades!',
            token,
            user: { id: user._id, name: user.name, email: user.email } // Skickar med namnet tillbaka så Vue kan hälsa "Välkommen Admin!"
        }).code(200);

    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }
};