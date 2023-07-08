import React from 'react';

export const createId = str => str.toLowerCase().split(' ').join('');

export const replaceWithJSX = (string, word, jsxElement) => {
  if (typeof string === 'string') {
    if (string.includes(word)) {
      const splittedText = string.split(word);
      const replacedText = splittedText.map((substring, index) => {
        if (index === splittedText.length - 1) {
          return substring;
        }
        return (
          <React.Fragment key={index}>
            {substring}
            {jsxElement}
          </React.Fragment>
        );
      });
      return replacedText;
    }
  }
  return string;
};

export const replaceWithLink = (item, text) => {
  if (item.hasOwnProperty('links')) {
    item.links.forEach(
      link =>
        (text = replaceWithJSX(
          text,
          link.text,
          <a href={link.path}>{link.text}</a>
        ))
    );
  }
  return text;
};
