import puppeteer from 'puppeteer';

(async () => {
  for(let i=1; i<=155; i++){
    const types = [];
    const abilites = [];
    const stats = [];
    const moves = [];

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://pokemondb.net/pokedex/${i}`);

  const nameSelector = '#main > h1';
  const num = i;
  const typeSelector = await page.$$(`#tab-basic-${i} > div:nth-child(1) > div:nth-child(2) > table > tbody > tr:nth-child(2) > td`);
  const speciesSelector = `#tab-basic-${i} > div:nth-child(1) > div:nth-child(2) > table > tbody > tr:nth-child(3) > td`;
  const heightSelector = `#tab-basic-${i} > div:nth-child(1) > div:nth-child(2) > table > tbody > tr:nth-child(4) > td`;
  const weightSelector = `#tab-basic-${i} > div:nth-child(1) > div:nth-child(2) > table > tbody > tr:nth-child(5) > td`;
  const abilitiesSelector = await page.$$(`#tab-basic-${i} > div:nth-child(1) > div:nth-child(2) > table > tbody > tr:nth-child(6) > td`);
  const descriptionSelector = `#main > div > table > tbody > tr:nth-child(1) > td`;
  const movesSelector = `#tab-moves-21 > div > div:nth-child(1) > div:nth-child(3) > table > tbody`;

  const statLabels = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed', 'Total'];
  for(let j=1; j<=6; j++){
    const statSelector = `#tab-basic-${i} > div:nth-child(2) > div.grid-col.span-md-12.span-lg-8 > div.resp-scroll > table > tbody > tr:nth-child(${j}) > td:nth-child(2)`;
    const stat = await page.$eval(statSelector, element => element.textContent);
    stats.push(`${statLabels[j - 1]}: ${stat}`);
  }

  const description = await page.$eval(descriptionSelector, element => element.textContent);
  
  const totalSelector = `#tab-basic-${i} > div:nth-child(2) > div.grid-col.span-md-12.span-lg-8 > div.resp-scroll > table > tfoot > tr > td`;
  const total = await page.$eval(totalSelector, element => element.textContent);
  stats.push(`${statLabels[6]}: ${total}`);
  

  for (const element of typeSelector) {
    const text = await page.evaluate(el => el.textContent.trim().replace(/\t+/g, ', ').trim(), element);
    types.push(text);
  }
  const moveLabels = ['LVL', 'Move', 'Type', 'Power', 'Accuracy'];
  const moveRows = await page.$$(movesSelector + ' > tr');
    for (const row of moveRows) {
      const level = await row.$eval('td:nth-child(1)', el => el.textContent.trim());
      const move = await row.$eval('td.cell-name a', el => el.textContent.trim());
      const type = await row.$eval('td:nth-child(3) a', el => el.textContent.trim());
      const power = await row.$eval('td:nth-child(5)', el => el.textContent.trim());
      const accuracy = await row.$eval('td:nth-child(6)', el => el.textContent.trim());

      moves.push(`${moveLabels[0]}: ${level}, ${moveLabels[1]}: ${move}, ${moveLabels[2]}: ${type}, ${moveLabels[3]}: ${power}, ${moveLabels[4]}: ${accuracy}`);
    }



  for (const element of abilitiesSelector) {
    const text = await page.evaluate(el => {
      const abilityTexts = Array.from(el.querySelectorAll('a, small'))
        .map(anchor => anchor.textContent.trim().replace(/\d+\./g, ''));
  
      const uniqueAbilities = []; 
      abilityTexts.forEach(ability => {
        const normalizedAbility = ability.replace(/\s*\(hidden ability\)$/, '').trim();
        if (!uniqueAbilities.some(a => a.replace(/\s*\(hidden ability\)$/, '').trim() === normalizedAbility)) {
          uniqueAbilities.push(ability);
        }
      });
  
      return uniqueAbilities.join(', ');
    }, element);
  
    abilites.push(text);
  }
  


  const pokemonName = await page.$eval(nameSelector, element => element.textContent);
  const pokemonSpecies = await page.$eval(speciesSelector, element => element.textContent);
  const pokemonHeight = await page.$eval(heightSelector, element => element.textContent.replace(/\u00A0/g, ''));
  const pokemonWeight = await page.$eval(weightSelector, element => element.textContent.replace(/\u00A0/g, ''));
  console.log('Pokemon Number: ',num);
  console.log('Pokemon Name: ', pokemonName);
  console.log('Pokemon Type: ',types);
  console.log('Pokemon Species: ',pokemonSpecies);
  console.log('Pokemon Height: ',pokemonHeight);
  console.log('Pokemon Weight: ',pokemonWeight);
  console.log('Description: ', description);
  console.log('Pokemon Abilities: ', abilites);
  console.log('Pokemon Stats: ', stats);
  console.log('Pokemon Moves: ', moves);

  console.log('\n\n');
  await browser.close();

  
  }



})();
