const express = require('express');
const { Pool } = require('pg');
const app = express();

app.use(express.static('public/home'));

const pool = new Pool({
  connectionString: 'postgres://metanoia_user:vixgfYScDTPCg25cm3QKpdyC1rObyDHU@dpg-cnibco8l6cac7397fd0g-a/metanoia',
});

pool.query(`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS response CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE IF NOT EXISTS users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS questions(
  question_id INT AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(500) NOT NULL,
);

CREATE TABLE IF NOT EXISTS response(
  id INT NOT NULL,
  question_id INT NOT NULL,
  response VARCHAR(500) NOT NULL,
  date DATE NOT NULL,
  PRIMARY KEY (question_id, id, date),
  FOREIGN KEY (question_id) REFERENCES questions(question_id),
  FOREIGN KEY (id) REFERENCES users(id)
);
`, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("tables initialized");
  }
});

pool.query(`
INSERT INTO users(email) VALUES ('user1@example.com'), ('user2@example.com');
INSERT INTO questions(question_id, question) VALUES 
(1, 'What is the true purpose of life?'),
(2, 'Is there a universal standard of good and evil?'),
(3, 'How do our experiences shape our perception of reality?'),
(4, 'Can happiness be found in material possessions?'),
(5, 'What is the nature of consciousness?'),
(6, 'Is there life after death?'),
(7, 'What does it mean to live authentically?'),
(8, 'Is it possible to experience true freedom?'),
(9, 'What is the role of fate in our lives?'),
(10, 'How does language shape our understanding of the world?'),
(11, 'Is the pursuit of knowledge always a noble endeavor?'),
(12, 'What is the essence of being human?'),
(13, 'Can a society exist without laws?'),
(14, 'Is there such a thing as absolute truth?'),
(15, 'What is the nature of time?'),
(16, 'Can true peace be achieved in the world?'),
(17, 'What does it mean to lead a good life?'),
(18, 'Is love an emotion or a choice?'),
(19, 'How important is individuality in a conformist society?'),
(20, 'What is the role of art in human culture?'),
(21, 'Is the universe inherently chaotic or orderly?'),
(22, 'What is the meaning of suffering?'),
(23, 'Can we ever truly understand another person?'),
(24, 'What is the nature of intuition?'),
(25, 'Is there a balance between individual rights and social responsibilities?'),
(26, 'What makes life worth living?'),
(27, 'Is it possible to create a utopian society?'),
(28, 'What is the role of technology in human evolution?'),
(29, 'Can wisdom be taught or is it innate?'),
(30, 'Is there a higher purpose to human existence?'),
(31, 'What is the nature of reality?'),
(32, 'How do we determine ethical behavior?'),
(33, 'Is it possible to live a completely selfless life?'),
(34, 'What is the role of government in personal freedom?'),
(35, 'Can human beings achieve immortality?'),
(36, 'What is the nature of creativity?'),
(37, 'Is there a meaning to dreams?'),
(38, 'What is the importance of self-reflection?'),
(39, 'Can human nature be fundamentally changed?'),
(40, 'Is there a limit to human understanding?'),
(41, 'What is the role of memory in shaping our identity?'),
(42, 'Is true altruism possible?'),
(43, 'What is the relationship between mind and body?'),
(44, 'How does culture influence personal identity?'),
(45, 'Is it better to have loved and lost than never to have loved at all?'),
(46, 'What is the nature of friendship?'),
(47, 'Can conflict lead to positive change?'),
(48, 'What is the role of faith in a secular world?'),
(49, 'Is destiny something we can control?'),
(50, 'What is the meaning of true freedom?'),
(51, 'What is the role of suffering in personal growth?'),
(52, 'Can knowledge exist without language?'),
(53, 'What is the nature of a just society?'),
(54, 'Is happiness a choice or a consequence?'),
(55, 'What does it mean to be morally responsible?'),
(56, 'Is there such a thing as a selfless act?'),
(57, 'How does our perception of time affect our lives?'),
(58, 'Can there be ethics without religion?'),
(59, 'What is the essence of true bravery?'),
(60, 'Is it possible to achieve absolute freedom of thought?'),
(61, 'What is the nature of a fulfilled life?'),
(62, 'How do we define what is real?'),
(63, 'What is the role of chance in our lives?'),
(64, 'Can true equality ever be attained?'),
(65, 'Is there a limit to human compassion?'),
(66, 'What does it mean to live in the present?'),
(67, 'How does technology impact our humanity?'),
(68, 'What is the nature of wisdom?'),
(69, 'Can a person be truly objective?'),
(70, 'What is the role of dreams in our lives?'),
(71, 'Is there inherent meaning in the universe?'),
(72, 'How do we find balance in a chaotic world?'),
(73, 'What is the nature of a true leader?'),
(74, 'Is there such a thing as destiny or is everything random?'),
(75, 'How does one find inner peace?'),
(76, 'What is the nature of sacrifice?'),
(77, 'Can humans live in harmony with nature?'),
(78, 'What does it mean to be enlightened?'),
(79, 'How does culture shape our values?'),
(80, 'Is it possible to live without fear?'),
(81, 'What is the nature of personal identity?'),
(82, 'How does one measure success in life?'),
(83, 'Is there a universal language beyond words?'),
(84, 'Can we ever truly escape our past?'),
(85, 'What is the nature of human vulnerability?'),
(86, 'How important is self-expression?'),
(87, 'Is it possible to understand the mind of another being?'),
(88, 'What is the role of morality in a modern society?'),
(89, 'How do we determine what is fair?'),
(90, 'What does it mean to be truly independent?'),
(91, 'Is there an ultimate goal for humanity?'),
(92, 'What is the nature of reality?'),
(93, 'How do we find balance in a chaotic world?'),
(94, 'What is the nature of a true leader?'),
(95, 'Is there such a thing as destiny or is everything random?'),
(96, 'How does one find inner peace?'),
(97, 'What is the nature of sacrifice?'),
(98, 'Can humans live in harmony with nature?'),
(99, 'What does it mean to be enlightened?'),
(100, 'How does culture shape our values?'),
(101, 'What is the true purpose of life?'),
(102, 'Is there a universal standard of good and evil?'),
(103, 'How do our experiences shape our perception of reality?'),
(104, 'Can happiness be found in material possessions?'),
(105, 'What is the nature of consciousness?'),
(106, 'Is there life after death?'),
(107, 'What does it mean to live authentically?'),
(108, 'Is it possible to experience true freedom?'),
(109, 'What is the role of fate in our lives?'),
(110, 'How does language shape our understanding of the world?'),
(111, 'Is the pursuit of knowledge always a noble endeavor?'),
(112, 'What is the essence of being human?'),
(113, 'Can a society exist without laws?'),
(114, 'Is there such a thing as absolute truth?'),
(115, 'What is the nature of time?'),
(116, 'Can true peace be achieved in the world?'),
(117, 'What does it mean to lead a good life?'),
(118, 'Is love an emotion or a choice?'),
(119, 'How important is individuality in a conformist society?'),
(120, 'What is the role of art in human culture?'),
(121, 'Is the universe inherently chaotic or orderly?'),
(122, 'What is the meaning of suffering?'),
(123, 'Can we ever truly understand another person?'),
(124, 'What is the nature of intuition?'),
(125, 'Is there a balance between individual rights and social responsibilities?'),
(126, 'What makes life worth living?'),
(127, 'Is it possible to create a utopian society?'),
(128, 'What is the role of technology in human evolution?'),
(129, 'Can wisdom be taught or is it innate?'),
(130, 'Is there a higher purpose to human existence?'),
(131, 'What is the nature of reality?'),
(132, 'How do we determine ethical behavior?'),
(133, 'Is it possible to live a completely selfless life?'),
(134, 'What is the role of government in personal freedom?'),
(135, 'Can human beings achieve immortality?'),
(136, 'What is the nature of creativity?'),
(137, 'Is there a meaning to dreams?'),
(138, 'What is the importance of self-reflection?'),
(139, 'Can human nature be fundamentally changed?'),
(140, 'Is there a limit to human understanding?'),
(141, 'What is the role of memory in shaping our identity?'),
(142, 'Is true altruism possible?'),
(143, 'What is the relationship between mind and body?'),
(144, 'How does culture influence personal identity?'),
(145, 'Is it better to have loved and lost than never to have loved at all?'),
(146, 'What is the nature of friendship?'),
(147, 'Can conflict lead to positive change?'),
(148, 'What is the role of faith in a secular world?'),
(149, 'Is destiny something we can control?'),
(150, 'What is the meaning of true freedom?'),
(151, 'What is the role of suffering in personal growth?'),
(152, 'Can knowledge exist without language?'),
(153, 'What is the nature of a just society?'),
(154, 'Is happiness a choice or a consequence?'),
(155, 'What does it mean to be morally responsible?'),
(156, 'Is there such a thing as a selfless act?'),
(157, 'How does our perception of time affect our lives?'),
(158, 'Can there be ethics without religion?'),
(159, 'What is the essence of true bravery?'),
(160, 'Is it possible to achieve absolute freedom of thought?'),
(161, 'What is the nature of a fulfilled life?'),
(162, 'How do we define what is real?'),
(163, 'What is the role of chance in our lives?'),
(164, 'Can true equality ever be attained?'),
(165, 'Is there a limit to human compassion?'),
(166, 'What does it mean to live in the present?'),
(167, 'How does technology impact our humanity?'),
(168, 'What is the nature of wisdom?'),
(169, 'Can a person be truly objective?'),
(170, 'What is the role of dreams in our lives?'),
(171, 'Is there inherent meaning in the universe?'),
(172, 'How do we find balance in a chaotic world?'),
(173, 'What is the nature of a true leader?'),
(174, 'Is there such a thing as destiny or is everything random?'),
(175, 'How does one find inner peace?'),
(176, 'What is the nature of sacrifice?'),
(177, 'Can humans live in harmony with nature?'),
(178, 'What does it mean to be enlightened?'),
(179, 'How does culture shape our values?'),
(180, 'Is it possible to live without fear?'),
(181, 'What is the nature of personal identity?'),
(182, 'How does one measure success in life?'),
(183, 'Is there a universal language beyond words?'),
(184, 'Can we ever truly escape our past?'),
(185, 'What is the nature of human vulnerability?'),
(186, 'How important is self-expression?'),
(187, 'Is it possible to understand the mind of another being?'),
(188, 'What is the role of morality in a modern society?'),
(189, 'How do we determine what is fair?'),
(190, 'What does it mean to be truly independent?'),
(191, 'Is there an ultimate goal for humanity?'),
(192, 'How do we define freedom?'),
(193, 'What is the importance of preserving history?'),
(194, 'Can one find happiness in solitude?'),
(195, 'What is the nature of truth and deception?'),
(196, 'How does power affect human relationships?'),
(197, 'Is there a perfect way to govern?'),
(198, 'What is the role of education in shaping the future?'),
(199, 'Can we find unity in diversity?'),
(200, 'What is the essence of a meaningful conversation?'),
(201, 'How does personal experience shape belief?'),
(202, 'What is the nature of a moral obligation?'),
(203, 'Can absolute freedom coexist with social order?'),
(204, 'What role does fear play in shaping human behavior?'),
(205, 'Is it possible to achieve complete understanding?'),
(206, 'What is the essence of a meaningful life?'),
(207, 'How does change affect the nature of society?'),
(208, 'What is the meaning of true courage?'),
(209, 'Can we ever fully understand the nature of reality?'),
(210, 'Is it possible to live a life without regret?'),
(211, 'What is the role of doubt in personal growth?'),
(212, 'Can wisdom be found in every experience?'),
(213, 'What does it mean to have a fulfilling relationship?'),
(214, 'Is there a universal path to happiness?'),
(215, 'How does language shape our identity?'),
(216, 'Is the pursuit of perfection a worthy endeavor?'),
(217, 'What is the nature of human resilience?'),
(218, 'Can we ever achieve a state of complete contentment?'),
(219, 'What is the true nature of freedom?'),
(220, 'Is there a limit to empathy?'),
(221, 'How do we find meaning in suffering?'),
(222, 'What is the role of intuition versus logic?'),
(223, 'Can we create a perfect society?'),
(224, 'What does it mean to be truly authentic?'),
(225, 'Is it possible to make a decision without bias?'),
(226, 'What is the nature of human connection?'),
(227, 'Can we ever escape the influence of our culture?'),
(228, 'Is the pursuit of knowledge a moral obligation?'),
(229, 'What is the role of creativity in human progress?'),
(230, 'Can there be morality without empathy?'),
(231, 'How do we determine the value of life?'),
(232, 'Is it possible to live without causing harm?'),
(233, 'What is the nature of human conflict?'),
(234, 'Can a person change their fundamental nature?'),
(235, 'What is the role of technology in defining humanity?'),
(236, 'Is the concept of destiny real?'),
(237, 'How does one find balance between self and others?'),
(238, 'What is the nature of truth in a post-truth era?'),
(239, 'Can inner peace be achieved in a turbulent world?'),
(240, 'What is the role of education in shaping character?'),
(241, 'Is there a difference between living and surviving?'),
(242, 'Can we find truth through art?'),
(243, 'What is the nature of sacrifice for others?'),
(244, 'Is it possible to be completely impartial?'),
(245, 'How do we find our place in an ever-changing world?'),
(246, 'What is the nature of loyalty?'),
(247, 'Can true leadership exist without power?'),
(248, 'Is it possible to understand the universe?'),
(249, 'What does it mean to be part of a community?'),
(250, 'How does one maintain hope in challenging times?'),
(251, 'What is the role of tradition in a rapidly changing world?'),
(252, 'Can true wisdom be found in solitude?'),
(253, 'Is the pursuit of happiness a universal right?'),
(254, 'How do personal beliefs shape our understanding of truth?'),
(255, 'What is the nature of a just war?'),
(256, 'Can a society achieve progress without conflict?'),
(257, 'What does it mean to be truly free?'),
(258, 'Is there a universal language of emotion?'),
(259, 'How does one find purpose in life''s challenges?'),
(260, 'What is the role of art in expressing the human condition?'),
(261, 'Is it possible to have an objective view of reality?'),
(262, 'What is the nature of unconditional love?'),
(263, 'Can human beings live in a state of complete harmony?'),
(264, 'What is the role of empathy in human relationships?'),
(265, 'How do we define what is sacred?'),
(266, 'Is it possible to create a world without injustice?'),
(267, 'What is the nature of personal sacrifice?'),
(268, 'Can true equality exist in a diverse society?'),
(269, 'What is the role of silence in communication?'),
(270, 'Is there a moral duty to seek the truth?'),
(271, 'What is the nature of human courage?'),
(272, 'Can we find beauty in imperfection?'),
(273, 'How does one maintain integrity in a complex world?'),
(274, 'What is the role of individual conscience in society?'),
(275, 'Is there such a thing as fate or destiny?'),
(276, 'How do we balance freedom of expression with social responsibility?'),
(277, 'What is the nature of inner strength?'),
(278, 'Can human creativity be limitless?'),
(279, 'What does it mean to live a life of simplicity?'),
(280, 'Is there a universal ethic that governs all cultures?'),
(281, 'How do we find meaning in the face of adversity?'),
(282, 'What is the role of intuition in human knowledge?'),
(283, 'Can we achieve a global understanding of one another?'),
(284, 'What is the nature of human resilience in the face of tragedy?'),
(285, 'How do we determine the value of art?'),
(286, 'Is there a right way to interpret history?'),
(287, 'What is the role of religion in a secular society?'),
(288, 'Can we ever truly understand the human mind?'),
(289, 'What is the nature of personal identity?'),
(290, 'How do we define the essence of humanity?'),
(291, 'What is the role of technology in shaping human relationships?'),
(292, 'Is it possible to live a life without conflict?'),
(293, 'How do we find balance between tradition and innovation?'),
(294, 'What is the nature of human creativity?'),
(295, 'Can we understand the universe without understanding ourselves?'),
(296, 'What is the role of passion in personal fulfillment?'),
(297, 'How does culture influence our perception of the world?'),
(298, 'Is it possible to achieve a state of absolute knowledge?'),
(299, 'What is the nature of human connection in a digital world?'),
(300, 'How do we cultivate a sense of community in an individualistic society?'),
(301, 'What is the nature of true selflessness?'),
(302, 'How does one navigate the balance between freedom and security?'),
(303, 'What is the role of desire in shaping human behavior?'),
(304, 'Can moral values be universal or are they culturally relative?'),
(305, 'Is it possible to find truth in subjectivity?'),
(306, 'What defines the essence of leadership?'),
(307, 'How does one find contentment in uncertainty?'),
(308, 'What is the role of suffering in the human experience?'),
(309, 'Can a society be free without being just?'),
(310, 'What is the nature of human adaptability?'),
(311, 'How do we define what is inherently human?'),
(312, 'Is it possible to live without biases?'),
(313, 'What is the role of pain in personal growth?'),
(314, 'Can we ever truly be free of our past?'),
(315, 'What is the nature of forgiveness and reconciliation?'),
(316, 'How do we balance individuality with collective responsibility?'),
(317, 'Is there such a thing as objective morality?'),
(318, 'What is the nature of human dependency on technology?'),
(319, 'Can we achieve true understanding through empathy?'),
(320, 'How do we distinguish between reality and perception?'),
(321, 'What is the role of doubt in the pursuit of knowledge?'),
(322, 'Is it possible to be completely self-reliant?'),
(323, 'What is the nature of human connection in an age of digital interaction?'),
(324, 'How do societal expectations shape individual choices?'),
(325, 'Is the concept of utopia inherently flawed?'),
(326, 'What is the role of intuition in a rational world?'),
(327, 'Can we ever find a balance between work and life?'),
(328, 'What does it mean to live an ethical life in a complex world?'),
(329, 'Is there a point where technological advancement becomes detrimental?'),
(330, 'How do we find personal identity in a globalized world?'),
(331, 'What is the nature of trust in human relationships?'),
(332, 'Can a person''s essence be captured through art?'),
(333, 'Is it possible to experience complete freedom of thought?'),
(334, 'What is the role of sacrifice in achieving personal goals?'),
(335, 'How does one cultivate resilience in the face of adversity?'),
(336, 'What is the nature of personal responsibility in societal change?'),
(337, 'Can there be true justice in an imperfect world?'),
(338, 'What is the role of spontaneity in a structured life?'),
(339, 'Is it possible to achieve absolute peace?'),
(340, 'How do we find meaning in a world of chaos?'),
(341, 'What is the nature of human conflict and cooperation?'),
(342, 'Can we truly understand the experiences of others?'),
(343, 'What is the role of passion in shaping our destiny?'),
(344, 'Is it possible to live a completely honest life?'),
(345, 'How do cultural narratives shape our understanding of history?'),
(346, 'What is the nature of human perception and its limitations?'),
(347, 'Can we ever achieve a perfect understanding of ourselves?'),
(348, 'What is the role of hope in human progress?'),
(349, 'How does one balance tradition with progress?'),
(350, 'Is the search for happiness an endless pursuit?'),
(351, 'What is the nature of altruism in a competitive world?'),
(352, 'Can true contentment be found in a materialistic society?'),
(353, 'How do we reconcile individual freedom with social responsibility?'),
(354, 'What is the essence of a meaningful connection?'),
(355, 'Is it possible to achieve total self-awareness?'),
(356, 'What role does resilience play in personal development?'),
(357, 'Can a society value both tradition and innovation equally?'),
(358, 'How do we find purpose in a seemingly indifferent universe?'),
(359, 'What is the nature of ethical decision-making?'),
(360, 'Is it possible to live a life entirely devoid of regret?'),
(361, 'What is the role of skepticism in acquiring knowledge?'),
(362, 'Can a person truly change their core beliefs?'),
(363, 'How does cultural diversity enrich human experience?'),
(364, 'What is the nature of trust in an uncertain world?'),
(365, 'Can we achieve harmony between nature and technology?'),
(366, 'What does it mean to live a balanced life?');

INSERT INTO response(question_id, response, date, id) VALUES (1, 
'SQL is a standard language for managing data held in a relational database.', 
CURDATE(), 1), 
(2,'NoSQL databases are non-tabular, and store data differently than relational tables.', 
CURDATE(), 2);


`, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("questions inserted");
  }
});


app.get('/', (req, res) => {
  res.redirect('/home.html');
});


app.get('/login', (req, res) => {
  res.redirect('/loggedin.html');
});


// Create a new user
app.post('/users', (req, res) => {
  const { email } = req.body;
  pool.query('INSERT INTO users (email) VALUES ($1) RETURNING *', [email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err });
    } else {
      res.status(201).json(result.rows[0]);
    }
  });
});

//get all questions
app.get('/questions', (req, res) => {
  pool.query('SELECT * FROM questions', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err });
    } else {
      res.json(result.rows);
    }
  });
});

// Get all users
app.get('/users', (req, res) => {
  pool.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err });
    } else {
      res.json(result.rows);
    }
  });
});

// Update a user
// app.put('/users/:id', (req, res) => {
//   const { id } = req.params;
//   const { email } = req.body;
//   pool.query('UPDATE users SET email = $1 WHERE id = $2 RETURNING *', [email, id], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: err });
//     } else {
//       res.json(result.rows[0]);
//     }
//   });
// });

// // Delete a user
// app.delete('/users/:id', (req, res) => {
//   const { id } = req.params;
//   pool.query('DELETE FROM users WHERE id = $1', [id], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: err });
//     } else {
//       res.status(204).end();
//     }
//   });
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});