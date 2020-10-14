var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    const data = {
        description: `Gift med Sophie och med fyra barn spenderar jag mitt liv i Tranås. Det är 
            en stad mitt emellan Jönköping och Linköping fast INTE utmed E4:an utan man svänger 
            av i Gränna alternativt Mjölby för att komma till denna sommarpärla. 
            Den ligger vid sjön Sommen som är en fantastisk sjö för båtar med alla dess öar, 
            365 st sägs det.
            Mina intressen som jag utövar regelbundet är sång och musik, detta i ett par olika 
            körer. Sedan blir det en hel del flängande i närområdet på grund av barnens utövande 
            av sport, i nuläget fotboll i Tranås FF.
            Jag har jobbat med IT de senaste 20 åren och nu vill jag skapa mig en fast grund att 
            stå på när det gäller programmering. 
            Gillar att lära mig och få koll på nya saker så detta passar mig - att få studera mitt 
            i yrkeslivet - vilken lyx!`,
        name: "Johan Lindberg",
    };

    res.json(data);
});


module.exports = router;
