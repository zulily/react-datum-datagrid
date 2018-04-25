

#  see https://developer.mozilla.org/en-US/docs/Web/API/Element/closest

if window.Element and !Element::closest
  Element::closest = (s) ->
    matches = (@document or @ownerDocument).querySelectorAll(s)
    i = undefined
    el = this
    loop
      i = matches.length
      while --i >= 0 and matches.item(i) != el
        continue
      unless i < 0 and (el = el.parentElement)
        break
    el

