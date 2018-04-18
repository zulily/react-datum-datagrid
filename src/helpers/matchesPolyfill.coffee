
# see https://developer.mozilla.org/en-US/docs/Web/API/Element/matches

if !Element::matches
  Element::matches = Element::matchesSelector or Element::mozMatchesSelector or Element::msMatchesSelector or Element::oMatchesSelector or Element::webkitMatchesSelector or (s) ->
    matches = (@document or @ownerDocument).querySelectorAll(s)
    i = matches.length
    while --i >= 0 and matches.item(i) != this
      continue
    i > -1
