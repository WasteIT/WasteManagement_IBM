function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 27359;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 27359 > /dev/null;
done;

for child in $(list_child_processes 27364);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/nusers/Documents/GitHub/WasteManagement_IBM/src/bin/Debug/net7.0/7dd0f297d22842a092cfa10e05765ce9.sh;