
[![Build Status](https://travis-ci.org/j-lindb73/proj-api.svg?branch=master)](https://travis-ci.org/github/j-lindb73/proj-api)
[![Build Status](https://scrutinizer-ci.com/g/j-lindb73/proj-api/badges/build.png?b=master)](https://scrutinizer-ci.com/g/j-lindb73/proj-api/build-status/master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/j-lindb73/proj-api/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/j-lindb73/proj-api/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/j-lindb73/proj-api/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/j-lindb73/proj-api/?branch=master)


# proj-api

### Project Background

This is the backend part of the final project in course js-ramverk which is given at Blekinge Tekniska Högskola (BTH) autumn of 2020.

It delivers users registration/login/deletion, stock purchasing/selling and chat between users via websockets.


### Documentation

[Express](https://expressjs.com/) is used to deliver API functions via routes. 

[SQLITE](https://sqlite.org/) is used to handle database which contains information about registered users and their money and stocks.

[mongoDB](https://mongodb.com) is ised to save chat messages between sessions.

### 'Krav 3: Realtid' in project specifications, in swedish)
Jag använde simulate-prices för inspiration och skapade 2 aktier (Hallonbåtar och Lakritssnören) som har varierande kurs. 
Ny kurs genereras var 5:e sekund via backend ohc plockas upp i frontend för att presenteras grafiskt och i text. Detta syns även då användaren är i icke inloggat läge. 
I inloggat läge används aktuell kurs vid köp och försäljning av aktieposter. 
Jag valde också att implemetera chat-funktionen (från tidigare kursmoment). Tidigare var det en fristående tjänst men nu bakade jag inte den tillsammans med övriga 
funktioner i backend.

Överlag är jag nöjd men mitt val av teknik har en liten bieffekt som jag inte lagt tillräckligt med tid för att lösa än. När jag genomför en försäljning av aktier hämtar jag aktuell kurs på vald aktie. Det påverkar visningen av aktierna och aktuell kurs ända tills en kursuppdatering anländer. 

### 'Krav 4: Tester backend' in project specifications, in swedish)
Precis som i tidigare kursmoment använde jag [Mocha](https://mochajs.org/) tillsammans med [Chai](https://www.chaijs.com/)  för att genomföra integrationstester
i kombination med [Istanbul](https://istanbul.js.org/) för att generera kodtäckning.
Som jag byggt upp det är det lite svårt att testa vissa funktioner. Om man med ett test t.ex. vill verifiera att email-adressen finns med vid köp av aktie så kommer man aldrig så långt eftersom det INNAN köpet görs en koll av användarens likvida medel så att han har råd att köpa aktierna. Redan där säger systemet ifrån om email-adressen saknas så köpet avbryts. Det påverkar ju egentligen inte funktionen i API:t men däremot kodtäckningen i vissa moduler. Jag lyckades kravla mig över 70% och med det får jag vara nöjd.

Jag skapade en CI-kedja med [Travis](https://travis-ci.org/) och kodtäcknings- och kodvalideringsverktyget [Scrutinizer](https://scrutinizer-ci.com/).
Jag hade en del problem med att få testerna av Chat att fungera. Lokalt gick det fint men i Travis var jag tvungen att få igång mongoDB i testmiljön vilket stökade lite...men det gick till slut.
När man väl har satt upp CI-kedjan känns det som om det är ett ovärderligt verktyg för att få koll på sin lösning och för att undvika driftstörningar. Visst, det är ÄCKLIGT irriterande när man gjort en uppdatering och så går skiten inte igenom testet men när man väl löst problemet som genererade felet är man ju i alla fall tacksam att det hittades direkt, och inte i ett senare skede.
I skrivande stund har jag en kodkvalitet på 6.10. Det är en liten besvikelse. Det är framförallt 2 funktioner som ställer till det för mig och just nu förstår jag inte vad som är problemet.

## Project setup

Set up the environment and install dependencies

```
npm install
```

### Configuration

If run on public servers in production, be sure to change secret in ```config.json```.

### Start server 

Start server in monitor mode (restart when file changes)

```
npm run start
```



### Reset chatlog

SSH to server.
```
proj-api/mongodb/node setup.js
```
