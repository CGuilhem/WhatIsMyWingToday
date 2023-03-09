const { SlashCommandBuilder } = require("discord.js");
const icsToJson = require("ics-to-json");

const CALENDAR =
  "https://www.pepal.eu/ical_student/c947c7c387a16df689845538b98b88f8";

const URI = "https://api.datamuse.com/words?ml=";

const ICSJSON = null

//Get a random number between start and end
const random = (start, end) => {
  return Math.floor(Math.random() * (end - start) + start);
};

//Convert the ICS file to JSON
const convertICStoJSON = async () => {

  if (ICSJSON) return ICSJSON

  const data = await fetch(CALENDAR);

  const text = await data.text();

  ICSJSON = icsToJson.default(text)

  return ICSJSON;
};

//Find the date of the current course based on the ICS file
const findDate = (icsJson) => {
  const [year, month, day] = new Date()
    .toISOString()
    .substring(0, 19)
    .split("T")[0]
    .split("-");

  const date = `${year}${month}${day}`;

  return icsJson.filter((course) => course.startDate.split("T")[0] === date)[0];
};

//Get a random word from the API
const randomWord = async (course) => {
  const word = course.summary.replace(" ", "+");

  const res = await fetch(URI + word);

  const data = await res.json();
  return data[random(0, data.length)].word;
};

//Slash command Builder
const data = new SlashCommandBuilder()
  .setName("sdv-name")
  .addStringOption((option) =>
    option
      .setName("suffix")
      .setDescription("Suffix for the name")
      .setRequired(true)
  )
  .setDescription("Renames you with a name of module SDV.");

//Execute the command
const execute = async (interaction) => {
  const suffix = interaction.options.getString("suffix") ?? "SDV";

  const ics = await convertICStoJSON();

  const course = findDate(ics);

  const word = await randomWord(course);

  await interaction.member.setNickname(
    "🏫 " + word.charAt(0).toUpperCase() + word.slice(1) + " " + suffix + " 💻"
  );

  await interaction.reply(
    `Profite bien de ton nouveau pseudo sponsorisé par SDV et le module du jour ${interaction.member} !`
  );
};

//Exports
module.exports = {
  data,
  execute,
  randomWord,
  findDate,
  convertICStoJSON,
  random,
};
